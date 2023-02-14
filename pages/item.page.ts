import { Page, expect } from '@playwright/test';

export default class ItemPage {
    constructor(public page: Page) {}

    moreInformationTab = '#tab-label-additional-title';
    moreInformationBlock = '#product-attribute-specs-table';
    reviewsTab = '#tab-label-reviews';
    reviewsBlock = '#reviews';
    addToCartBtn = '#product-addtocart-button';
    addedProductToCartAlert = '[role="alert"]';
    addToWishListBtn = "a[data-action='add-to-wishlist']";
    productPriceLocator = '.product-info-main .price';
    productNameLocator = '.product-info-main .base';
    productImagesLocator = '.fotorama__stage img';

    async getProductInformation(): Promise<{
        productName: string | null;
        productPrice: string | null;
        productImg: string[];
    }> {
        const name = await this.page.locator(this.productNameLocator).textContent();
        const price = await this.page.locator(this.productPriceLocator).textContent();
        const imagesElements = this.page.locator(this.productImagesLocator).elementHandles;
        const images: string[] = [];
        for (let i = 0; i < imagesElements.length; i++) {
            images.push(imagesElements[i].getAttribute('src'));
        }
        return { productName: name, productPrice: price, productImg: images };
    }

    productItemLocator(name: string) {
        return `//*[contains(@class, 'product-item-link') and contains(text(), '${name}')]`;
    }

    productItemColor(color: string) {
        return `[attribute-code="color"] [option-label="${
            color[0].toUpperCase() + color.slice(1)
        }"]`;
    }

    productItemSize(size: string) {
        return `[attribute-code="size"] [option-label="${size.toUpperCase()}"]`;
    }

    async selectProductItem(name: string) {
        await this.page.click(this.productItemLocator(name));
    }

    async selectProductItemColor(color: string) {
        await this.page.click(this.productItemColor(color));
    }

    async selectProductItemSize(size: string) {
        await this.page.click(this.productItemSize(size));
    }

    async clickAddToCartBtn() {
        await this.page.click(this.addToCartBtn);
    }

    async clickAddToWishListBtn() {
        await this.page.click(this.addToWishListBtn);
    }

    async verifyMoreInformationVisible() {
        await this.page.click(this.moreInformationTab);
        await this.page.waitForSelector(this.moreInformationBlock);
        await expect(this.page.locator(this.moreInformationBlock)).toBeVisible();
    }

    async verifyReviewsVisible() {
        await this.page.click(this.reviewsTab);
        await this.page.waitForSelector(this.reviewsBlock);
        await expect(this.page.locator(this.reviewsBlock)).toBeVisible();
    }

    async verifyProductName(productName: string) {
        expect(await this.page.locator(this.productNameLocator).innerText()).toMatch(
            productName
        );
    }

    async verifyProductPrice(productPrice: string) {
        expect(await this.page.locator(this.productPriceLocator).innerText()).toMatch(
            productPrice
        );
    }

    async verifyProductImages(productImg: string[]) {
        const imagesElements = this.page.locator(this.productImagesLocator).elementHandles;
        const images: string[] = [];
        for (let i = 0; i < imagesElements.length; i++) {
            images.push(imagesElements[i].getAttribute('src'));
        }

        for (let i = 0; i < images.length; i++) {
            expect(images[i]).toEqual(productImg[i]);
        }
    }
}
