import {inject} from "aurelia-framework";
import {PostGroupingService} from "./lib/post-grouping-service";
import {PostStorage} from "./lib/storage/post-storage";
import {PostFormatter} from "./lib/post-formatter";
import * as moment from "moment";
import * as _ from "lodash";

@inject(PostGroupingService, PostStorage, PostFormatter)
export class App {
  public drafts;
  public publishedPosts;
  public router;
  
  constructor(private groupingService, 
              private storage, 
              private formatter) {
    this.updatePosts();
  }
  
  updatePosts() {
    this.drafts = this.formatter.formatPostList(
      this.groupingService.groupDrafts(
        this.storage.loadDrafts()
      )
    );
    
    this.publishedPosts = this.formatter.formatPostList(
      this.groupingService.groupPublishedPosts(
        this.storage.loadPublishedPosts()
      )
    );
  }
  
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'editor'], name: 'editor',      moduleId: 'editor',      nav: true, title: 'Editor' }
    ]);

    this.router = router;
  }
}
