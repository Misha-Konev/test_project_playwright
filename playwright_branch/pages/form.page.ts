import { Page } from '@playwright/test';

export default class FormPage {
  constructor(public page: Page) {}

  orderIdField = '#oar-order-id';
  lastNameField = '#oar-billing-lastname';
  findOrderByField = '#quick-search-type-id';
  emailField = '#oar_email';
  continueBtn = '[title="Continue"] span';

  async fillOrderIdField(id: string) {
    await this.page.locator(this.orderIdField).type(id);
  }

  async fillBillingLastNameField(lastName: string) {
    await this.page.locator(this.lastNameField).type(lastName);
  }

  async selectOptionInFindOrderByField(option: string) {
    await this.page.locator(this.findOrderByField).selectOption(option);
  }

  async fillEmailField(email: string) {
    await this.page.locator(this.emailField).type(email);
  }

  async clickContinueBtn() {
    await this.page.click(this.continueBtn);
  }
}
