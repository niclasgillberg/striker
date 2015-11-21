import {inject} from "aurelia-framework";
import {PostGroupingService} from "./lib/post-grouping-service";
import moment from "moment";

@inject(PostGroupingService)
export class App {
  
  constructor(groupingService) {
    this.groupingService = groupingService;
    this.posts =[{ 
      title: "Browser bundling with webpack",
      draft: true 
    },{ 
      title: "Blog setup 2.0",
      draft: true 
    },{ 
      title: "Use Typescript with Aurelia",
      draft: true 
    },{ 
      title: "Connect to Postgres in C#",
      draft: true
    },{ 
      title: "Get started with ASP.NET 5",
      draft: true 
    },{ 
      title: "Using Angular to fix collapsingwidth problem in CSS grids",
      publish_date: new Date("2015-07-05") 
    },{ 
      title: "Installing ASP.NET vNext on OSx",
      publish_date: new Date("2015-06-06") 
    },{ 
      title: "Running Gulp during TFS build",
      publish_date: new Date("2015-04-10") 
    },{ 
      title: "Using Angular to fix collapsingwidth problem in CSS grids",
      publish_date: new Date("2014-07-05") 
    },{ 
      title: "Installing ASP.NET vNext on OSx",
      publish_date: new Date("2014-06-06") 
    },{ 
      title: "Running Gulp during TFS build",
      publish_date: new Date("2014-04-10") 
    }];
  }
  
  get drafts() {
    return this.groupingService.groupDrafts(
      this.posts.filter(post => post.draft)
    );
  }
  
  get publishedPosts() {
    return this.groupingService.groupPublishedPosts(
      this.posts.filter(post => !post.draft && post.publishDate)
    );
  }
  
  convertPostList(posts) {
    const convertedPosts = [];
    for(let p in posts) {
      convertedPosts.push({
        key: this.formatKey(p)
      });
    }
    
    return convertedPosts;
  }
  
  formatKey(key) {
    let parseResult = key.match(/^\d+?$/)[0];
    if(parseResult >= 0 && parseResult < 12){
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
