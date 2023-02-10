import { Page } from '@playwright/test';

export default class AccountPage {
  constructor(public page: Page) {}

  changePasswordBtn = 'a.change-password';

  async clickChangePasswordBtn() {
    await this.page.click(this.changePasswordBtn);
  }
}
