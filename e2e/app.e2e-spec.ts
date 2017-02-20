import { NgDemoPage } from './app.po';

describe('ng-demo App', () => {
  let page: NgDemoPage;

  beforeEach(() => {
    page = new NgDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
