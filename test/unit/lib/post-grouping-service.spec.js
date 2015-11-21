import {PostGroupingService} from "../../../src/lib/post-grouping-service";
import {PostTestData} from "../../data/posts";

describe("the PostGrouping service", () => {
  let service;
  let drafts = PostTestData.getTestPosts().filter(x => x.draft);
  let publishedPosts = PostTestData.getTestPosts().filter(x => !x.draft)
  
  beforeEach(() => {
    service = new PostGroupingService();
  });
  
  describe("grouping drafts", () => {
    
    it("returns an array", () => {
      expect(service.groupDrafts([]) instanceof Array).toBe(true);
    });
    
    it("returns all drafts in a flat list", () => {
      expect(service.groupDrafts(drafts).filter(x => x.children).length).toBe(0);
    });
    
    it("returns all posts", () => {
      expect(service.groupDrafts(drafts).length).toEqual(drafts.length);
    });
    
  });
  
  describe("grouping published posts", () => {
    
    it("groups on year", () => {
      expect(service.groupPublishedPosts(publishedPosts)["2015"]).toBeDefined();
      expect(service.groupPublishedPosts(publishedPosts)["2014"]).toBeDefined();
    });
    
    it("groups on year and month"/*, () => {
      expect(service.groupPublishedPosts(publishedPosts)["2015"]["6"]).toBeDefined()
    }*/);
    
  });
});