import _ from "lodash";
import moment from "moment";

export class PostFormatter {
  
  formatPostList(posts) {
    const formattedPosts = posts instanceof Array ? posts : [];
    
    if(!formattedPosts.length){
      for(let p in posts) {
        const items = posts[p];
        formattedPosts.push({
          key: p,
          label: this.formatKey(p),
          items: items instanceof Array 
                  ? items 
                  : this.formatPostList(items)
        });
      }
    }
    
    return _.sortByOrder(formattedPosts, x => x.key, "desc");
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
  
}