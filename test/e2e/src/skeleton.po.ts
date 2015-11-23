declare var browser;
declare var element;
declare var by;

export class PageObject_Skeleton {

  constructor() {

  }

  getCurrentPageTitle() {
    return browser.getTitle();
  }

  navigateTo(href) {
    element(by.css('a[href="' + href + '"]')).click();
    return browser.waitForRouterComplete();
  }
}
