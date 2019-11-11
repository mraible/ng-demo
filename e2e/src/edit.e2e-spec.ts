import { browser, by, element } from 'protractor';

describe('Edit', () => {

  beforeEach(async () => {
    await browser.get('/edit/1');
  });

  const name = element(by.id('name'));
  const street = element(by.id('street'));
  const city = element(by.id('city'));

  it('should allow viewing a person', async () => {
    expect(await element(by.css('h3')).getText()).toEqual('Nikola Jokić');
    expect(await name.getAttribute('value')).toEqual('Nikola Jokić');
    expect(await street.getAttribute('value')).toEqual('2000 16th Street');
    expect(await city.getAttribute('value')).toEqual('Denver');
  });

  it('should allow updating a name', async () => {
    const save = element(by.id('save'));
    name.sendKeys(' Rocks!');
    await save.click();
    // verify one element matched this change
    const list = element.all(by.css('app-search table tbody tr'));
    expect(list.count()).toBe(1);
  });
});
