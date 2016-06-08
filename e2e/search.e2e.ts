describe('Search', () => {

  beforeEach(() => {
    browser.get('/search');
    element(by.linkText('Search')).click();
  });

  it('should have an input and search button', () => {
    expect(element(by.css('ng2-demo-app app-search form input')).isPresent()).toEqual(true);
    expect(element(by.css('ng2-demo-app app-search form button')).isPresent()).toEqual(true);
  });

  it('should allow searching', () => {
    let searchButton = element(by.css('button'));
    let searchBox = element(by.css('input'));
    searchBox.sendKeys('M');
    searchButton.click().then(() => {
      // doesn't work as expected - results in 0
      //expect(element.all(by.repeater('person of searchResults')).count()).toEqual(3);
      var list = element.all(by.css('app-search table tbody tr'));
      expect(list.count()).toBe(3);
    });
  });
});
