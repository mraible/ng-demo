describe('Search', () => {

  beforeEach(() => {
    browser.get('/search');
    element(by.linkText('Search')).click();
  });

  it('should have an input and search button', () => {
    expect(element(by.css('app-root app-search form input')).isPresent()).toEqual(true);
    expect(element(by.css('app-root app-search form button')).isPresent()).toEqual(true);
  });

  it('should allow searching', () => {
    let searchButton = element(by.css('button'));
    let searchBox = element(by.css('input'));
    searchBox.sendKeys('M');
    searchButton.click().then(() => {
      let list = element.all(by.css('app-search table tbody tr'));
      expect(list.count()).toBe(3);
    });
  });
});
