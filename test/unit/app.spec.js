import {App} from '../../src/app';
import {PostTestData} from "../data/posts";

describe("the App module", () => {
  let app;
  
  beforeEach(() => {
    app = new App();
  });
  
  describe("converting list of posts", () => {
    
    it("converts object to list", () => {
      expect(app.convertPostList({}) instanceof Array).toBeTruthy();
    });
    
    it("converts object key", () => {
      expect(app.convertPostList({"2015": []})[0].key).toEqual("2015");
    });
    
    it("converts the label", () => {
      expect(app.convertPostList({"6": []})[0].key).toEqual("July");
    });
    
    it("converts labels on multiple levels", () => {
      expect(app.convertPostList({
        "2015": {
          "6": [{
            title: "post title"
          }]
        }
      })).toEqual([{
        key: "2015",
        items: [{
          key: "July",
          items: [{
            title: "post title"
          }]
        }]
      }]);
    });
    
  });
  
  describe("formatting the label", () => {
    
    describe("formatting years", () => {
      
      it("formats 1999 to 1999", () => {
        expect(app.formatKey("1999")).toEqual("1999");
      });
      
      it("formats 2015 to 2015", () => {
        expect(app.formatKey("2015")).toEqual("2015");
      });
      
    });
    
    describe("formatting months", () => {
      
      it("formats 0 to January", () => {
        expect(app.formatKey("0")).toEqual("January");
      });
      
      it("formats 3 to April", () => {
        expect(app.formatKey("3")).toEqual("April");
      });
      
      it("formats 9 to October", () => {
        expect(app.formatKey("9")).toEqual("October");
      });
      
      it("formats 11 to December", () => {
        expect(app.formatKey("11")).toEqual("December");
      });
      
      it("formats 12 to 12", () => {
        expect(app.formatKey("12")).toEqual("12");
      });
      
      it("formats 20 to 20", () => {
        expect(app.formatKey("20")).toEqual("20");
      });
      
    });
    
  });
  
});
