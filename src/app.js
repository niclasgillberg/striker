import {inject} from "aurelia-framework";
import {PostGroupingService} from "./lib/post-grouping-service";
import {PostStorage} from "./lib/storage/post-storage";
import moment from "moment";
import _ from "lodash";

@inject(PostGroupingService, PostStorage)
export class App {
  
  constructor(groupingService, storage) {
    this.groupingService = groupingService;
    this.storage = storage;
  }
  
  get drafts() {
    return this.groupingService.groupDrafts(
      this.storage.loadDrafts()
    );
  }
  
  get publishedPosts() {
    return this.convertPostList(this.groupingService.groupPublishedPosts(
      this.storage.loadPublishedPosts()
    ));
  }
  
  convertPostList(posts) {
    const convertedPosts = [];
    for(let p in posts) {
      const items = posts[p];
      convertedPosts.push({
        key: p,
        label: this.formatKey(p),
        items: items instanceof Array 
                ? items 
                : this.convertPostList(items)
      });
    }
    
    return _.sortByOrder(convertedPosts, x => x.key, "desc");
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
