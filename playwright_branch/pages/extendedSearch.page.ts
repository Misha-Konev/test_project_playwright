import { Page } from '@playwright/test';

export default class ExtendedSearchPage {
  constructor(public page: Page) {}

  productNameInputField = '#name';
  skuInputField = '#sku';
  descriptionInputField = '#description';
  shortDescriptionInputField = '#short_description';
  priceFromInputField = "input[name='price[from]']";
  priceToInputField = "input[name='price[to]']";
  searchBtn = ".search button[type='submit']";

  async clickSearchBtn() {
    await this.page.locator(this.searchBtn).click();
  }

  async fillProductNameInputField(productName: string) {
    await this.page.waitForSelector(this.productNameInputField);
    await this.page.locator(this.productNameInputField).type(productName);
  }

  async fillSkuInputField(sku: string) {
    await this.page.waitForSelector(this.skuInputField);
    await this.page.locator(this.skuInputField).type(sku);
  }

  async fillDescriptionInputField(description: string) {
    await this.page.waitForSelector(this.descriptionInputField);
    await this.page.locator(this.descriptionInputField).type(description);
  }

  async fillPriceFromInputField(priceFrom: string) {
    await this.page.waitForSelector(this.priceFromInputField);
    await this.page.locator(this.priceFromInputField).type(priceFrom);
  }

  async fillPriceToInputField(priceTo: string) {
    await this.page.waitForSelector(this.priceToInputField);
    await this.page.locator(this.priceToInputField).type(priceTo);
  }
}
