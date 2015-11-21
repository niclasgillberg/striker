import {inject} from "aurelia-framework";
import {PostGroupingService} from "./lib/post-grouping-service";
import {PostStorage} from "./lib/storage/post-storage";
import moment from "moment";

@inject(PostGroupingService, PostStorage)
export class App {
  
  constructor(groupingService, storage) {
    this.groupingService = groupingService;
    this.posts = storage.loadPosts();
  }
  
  get drafts() {
    return this.groupingService.groupDrafts(
      this.posts.filter(post => post.draft)
    );
  }
  
  get publishedPosts() {
    return this.convertPostList(this.groupingService.groupPublishedPosts(
      this.posts.filter(post => !post.draft && post.publishDate)
    ));
  }
  
  convertPostList(posts) {
    const convertedPosts = [];
    for(let p in posts) {
      const items = posts[p];
      convertedPosts.push({
        key: this.formatKey(p),
        items: items instanceof Array 
                ? items 
                : this.convertPostList(items)
      });
    }
    
    return convertedPosts;
  }
  
  formatKey(key) {
    if(key == null)
      return;
      
    let parseResult = key.match(/^\d+?$/);
    if(parseResult != null && 
       parseResult[0] >= 0 && 
       parseResult[0] < 12){
      let date = new Date();
      date.setMonth(key);
      return moment(date).format("MMMM");
    }
    return key;
  }
  
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'editor'], name: 'editor',      moduleId: 'editor',      nav: true, title: 'Editor' }
    ]);

    this.router = router;
  }
}
