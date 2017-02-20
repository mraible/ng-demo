import { browser, element, by } from 'protractor';

export class NgDemoPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root md-toolbar')).getText();
  }
}
