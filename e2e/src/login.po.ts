import { browser, by, element, ExpectedConditions as ec } from 'protractor';

export class LoginPage {
  username = element(by.name('username'));
  password = element(by.name('password'));
  // button on IdP sign-in form
  loginButton = element(by.css('input[type=submit]'));
  signInButton = element(by.id('login'));
  logoutButton = element(by.id('logout'));
  welcomeMessage = element(by.css('h2'));

  async login() {
    await browser.get('/');
    await browser.wait(ec.visibilityOf(this.signInButton));
    await this.signInButton.click();
    await this.loginToIdP(process.env.E2E_USERNAME, process.env.E2E_PASSWORD);
    const welcome = /Welcome, Okta Demo/;
    await browser.wait(ec.visibilityOf(this.logoutButton));
    await browser.sleep(2000); // wait for user to resolve
    expect(this.welcomeMessage.getText()).toMatch(welcome);
  }

  async loginToIdP(username: string, password: string) {
    // Entering non angular site, tell webdriver to switch to synchronous mode.
    await browser.waitForAngularEnabled(false);
    await browser.wait(ec.visibilityOf(this.username));

    if (await this.username.isPresent()) {
      await this.username.sendKeys(username);
      await this.password.sendKeys(password);
      await this.loginButton.click();
      if (!(await this.username.isPresent())) {
        await browser.waitForAngularEnabled(true);
      }
    } else {
      // redirected back because already logged in
      await browser.waitForAngularEnabled(true);
    }
  }

  async logout() {
    await browser.get('/');
    await browser.wait(ec.visibilityOf(this.logoutButton));
    await this.logoutButton.click();
    await browser.sleep(1000);
  }
}
