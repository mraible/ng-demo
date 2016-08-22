describe('Edit', () => {

  beforeEach(() => {
    browser.get('/edit/1');
  });

  let name = element(by.id('name'));
  let street = element(by.id('street'));
  let city = element(by.id('city'));

  it('should allow viewing a person', () => {
    expect(element(by.css('h3')).getText()).toEqual('Peyton Manning');
    expect(name.getAttribute('value')).toEqual('Peyton Manning');
    expect(street.getAttribute('value')).toEqual('1234 Main Street');
    expect(city.getAttribute('value')).toEqual('Greenwood Village');
  });

  it('should allow updating a name', function () {
    let save = element(by.id('save'));
    // send individual characters since sendKeys passes partial values sometimes
    // https://github.com/angular/protractor/issues/698
    ' Won!'.split('').forEach((c) => name.sendKeys(c));
    save.click();
    // verify one element matched this change
    let list = element.all(by.css('app-search table tbody tr'));
    expect(list.count()).toBe(1);
  });
});
