import { Page, expect } from '@playwright/test';

export default class CartPage {
    constructor(public page: Page) {}

    cartIconLocator = '.showcart';
    openCartLink = '//span[normalize-space()="View and Edit Cart"]';
    productItemSizeColor = '(//dt[contains(text(),"Size")])[2]/following-sibling::dd';
    cartCountLocator = '.counter-number';

    async openCartPage() {
        await this.page.waitForTimeout(3000);
        await this.page.click(this.cartIconLocator);
        await this.page.click(this.openCartLink);
        await this.page.waitForLoadState();
    }

    async verifyProductItemSizeColor(productDetail: string[]) {
        await this.page.waitForSelector(this.productItemSizeColor);
        expect(await this.page.locator(this.productItemSizeColor).allInnerTexts()).toEqual(
            productDetail
        );
    }
}
