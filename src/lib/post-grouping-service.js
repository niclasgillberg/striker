import _ from "lodash";

export class PostGroupingService {
  groupDrafts(posts) {
    return posts;
  }
  
  groupPublishedPosts(posts) {
    return _.groupBy(posts, x => x.publishDate.getFullYear());
  }
}