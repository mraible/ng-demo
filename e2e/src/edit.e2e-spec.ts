import { browser, by, element, ExpectedConditions as ec } from 'protractor';
import { LoginPage } from './login.po';

describe('Edit', () => {
  let loginPage: LoginPage;

  beforeAll(async () => {
    loginPage = new LoginPage();
    await loginPage.login();
  });

  afterAll(async () => {
    await loginPage.logout();
  });

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
    await browser.wait(ec.visibilityOf(name));
    await name.sendKeys(' Rocks!');
    await save.click();
    const list = element.all(by.css('app-search table tbody tr'));
    // verify one element matched this change
    expect(list.count()).toBe(1);
  });
});
