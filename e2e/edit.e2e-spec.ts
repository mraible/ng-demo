import { browser, by, element } from 'protractor';

describe('Edit', () => {

  beforeEach(() => {
    browser.get('/edit/1');
  });

  const name = element(by.id('name'));
  const street = element(by.id('street'));
  const city = element(by.id('city'));

  it('should allow viewing a person', () => {
    expect(element(by.css('h3')).getText()).toEqual('Peyton Manning');
    expect(name.getAttribute('value')).toEqual('Peyton Manning');
    expect(street.getAttribute('value')).toEqual('1234 Main Street');
    expect(city.getAttribute('value')).toEqual('Greenwood Village');
  });

  it('should allow updating a name', function () {
    const save = element(by.id('save'));
    name.sendKeys(' Won!');
    save.click();
    // verify one element matched this change
    const list = element.all(by.css('app-search table tbody tr'));
    expect(list.count()).toBe(1);
  });
});
