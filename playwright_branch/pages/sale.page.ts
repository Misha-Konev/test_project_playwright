import { Page } from '@playwright/test';

export default class SalePage {
  constructor(public page: Page) {}

  sidebarTeesBtn = '.sidebar [href$="/tees-women.html"]';

  async clickSidebarTeesBtn() {
    await this.page.click(this.sidebarTeesBtn);
  }
}
