import { Page } from '@playwright/test';

export default class RegistrationPage {
  constructor(public page: Page) {}

  emailInputField = '#email';
  passwordInputField = "input[name='login[password]']";
  signInButton = 'button.login';

  async fillEmailInputField(email: string) {
    await this.page.waitForSelector(this.emailInputField);
    await this.page.locator(this.emailInputField).type(email);
  }

  async fillPasswordInputField(password: string) {
    await this.page.waitForSelector(this.passwordInputField);
    await this.page.locator(this.passwordInputField).type(password);
  }

  async clickSignInBtn() {
    await this.page.click(this.signInButton);
  }
}
