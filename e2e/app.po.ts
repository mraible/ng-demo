export class Ng2DemoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ng2-demo-app h1')).getText();
  }
}
