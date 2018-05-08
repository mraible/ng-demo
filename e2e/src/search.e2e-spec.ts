import { browser, by, element } from 'protractor';

describe('Search', () => {

  beforeEach(async () => {
    await browser.get('/search');
  });

  it('should have an input and search button', () => {
    expect(element(by.css('app-root app-search form input')).isPresent()).toEqual(true);
    expect(element(by.css('app-root app-search form button')).isPresent()).toEqual(true);
  });

  it('should allow searching', async () => {
    const searchButton = element(by.css('button'));
    const searchBox = element(by.css('input'));
    await searchBox.sendKeys('M');
    await searchButton.click();
    const list = element.all(by.css('app-search table tbody tr'));
    expect(list.count()).toBe(3);
  });
});
