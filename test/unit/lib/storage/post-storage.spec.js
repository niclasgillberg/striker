import {PostStorage} from "../../../../src/lib/storage/post-storage";

describe("the PostStorage service", () => {
  let storage;
  
  beforeEach(() => {
    storage = new PostStorage();
  });
  
  it("sorts the drafts on title in ascending order", () => {
    const drafts = storage.loadDrafts();
    for(let i = 1; i < drafts.length; i++) {
      expect(drafts[i].title).not.toBeLessThan(drafts[i - 1].title);
    }
  });
  
  it("sorts the published posts on date in descending order", () => {
    const publishedPosts = storage.loadPublishedPosts();
    for(let i = 1; i < publishedPosts.length; i++) {
      expect(publishedPosts[i].publishDate)
          .toBeLessThan(publishedPosts[i - 1].publishDate);
    }
  });
  
});