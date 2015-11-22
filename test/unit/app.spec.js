import {App} from "../../src/app";
import {PostFormatter} from "../../src/lib/post-formatter";
import {PostGroupingService} from "../../src/lib/post-grouping-service";
import {PostTestData} from "../data/posts";

class FakeStorage {
  loadDrafts() {
    return PostTestData.getTestPosts().filter(x => x.draft);
  }
  
  loadPublishedPosts() {
    return PostTestData.getTestPosts().filter(x => !x.draft);
  }
}

describe("the App module", () => {
  let app;
  
  it("instantiates the module", () => {
    app = new App(new PostGroupingService(), new FakeStorage(), new PostFormatter());
  });
});
