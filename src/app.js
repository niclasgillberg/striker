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
      publishDate: new Date("2015-07-05") 
    },{ 
      title: "Installing ASP.NET vNext on OSx",
      publishDate: new Date("2015-06-06") 
    },{ 
      title: "Running Gulp during TFS build",
      publishDate: new Date("2015-04-10") 
    },{ 
      title: "Using Angular to fix collapsingwidth problem in CSS grids",
      publishDate: new Date("2014-07-05") 
    },{ 
      title: "Installing ASP.NET vNext on OSx",
      publishDate: new Date("2014-06-06") 
    },{ 
      title: "Running Gulp during TFS build",
      publishDate: new Date("2014-04-10") 
    }];
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
      items = posts[p];
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
