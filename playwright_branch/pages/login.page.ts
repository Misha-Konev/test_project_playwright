import { Page, expect } from '@playwright/test';

export default class LoginPage {
  constructor(public page: Page) {}

  // account elements
  createAccountLocator = '.panel [href$="create/"]';
  signInLocator = '.panel [href*="login"]';
  headerMenu = '.panel .customer-welcome';
  logOutBtn = `${this.headerMenu} .authorization-link`;
  myAccountBtn = `${this.headerMenu} li:first-child`;
  welcomeUserText = '.header ul:first-of-type .logged-in';

  // create account elements
  firstNameInputField = '#firstname';
  lastNameInputField = '#lastname';
  emailInputField = '#email_address';
  passwordInputField = '#password';
  passwordConfirmInputField = '#password-confirmation';
  createAccountBtn = '//button/span[text()="Create an Account"]';

  // login elements
  signInEmailField = '#email';
  signInPasswordField = '#pass';
  signInBtn = '#send2';

  async clickCreateAccountLink() {
    await this.page.click(this.createAccountLocator);
  }

  async clickSignInLink() {
    await this.page.click(this.signInLocator);
  }

  async clickCreateAccountBtn() {
    await this.page.click(this.createAccountBtn);
  }

  async clickSignInBtn() {
    await this.page.click(this.signInBtn);
  }

  async clickLogOutBtn() {
    await this.page.click(this.headerMenu);
    await this.page.click(this.logOutBtn);
  }

  async clickMyAccountBtn() {
    await this.page.click(this.headerMenu);
    await this.page.click(this.myAccountBtn);
  }

  async verifyWelcomeUserText(userName: string, userLastName: string) {
    await this.page.waitForSelector(this.welcomeUserText);
    expect(await this.page.locator(this.welcomeUserText).innerText()).toMatch(
      `Welcome, ${userName} ${userLastName}!`
    );
  }

  async fillFirstNameInputField(firstName: string) {
    await this.page.locator(this.firstNameInputField).type(firstName);
  }

  async fillLastNameInputField(lastName: string) {
    await this.page.locator(this.lastNameInputField).type(lastName);
  }

  async fillEmailInputField(email: string) {
    await this.page.locator(this.emailInputField).type(email);
  }

  async fillSignInEmailField(email: string) {
    await this.page.locator(this.signInEmailField).type(email);
  }

  async fillSignInPasswordField(password: string) {
    await this.page.locator(this.signInPasswordField).type(password);
  }

  async fillPasswordInputField(password: string) {
    await this.page.locator(this.passwordInputField).type(password);
  }

  async fillPasswordConfirmInputField(password: string) {
    await this.page.locator(this.passwordConfirmInputField).type(password);
  }
}
