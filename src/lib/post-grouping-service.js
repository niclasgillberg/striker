import _ from "lodash";

export class PostGroupingService {
  groupDrafts(posts) {
    return posts;
  }
  
  groupPublishedPosts(posts) {
    let yearGrouping = this.groupByYear(posts);
    
    for (let year in yearGrouping) {
      yearGrouping[year] = this.groupByMonth(yearGrouping[year]);
    }
    
    return yearGrouping;
  }
  
  groupByYear(posts) {
    return _.groupBy(posts, x => x.publishDate.getFullYear());
  }
  
  groupByMonth(posts) {
    return _.groupBy(posts, x => x.publishDate.getMonth());
  }
}