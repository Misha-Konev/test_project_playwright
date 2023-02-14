import { Page } from '@playwright/test';

export default class UpdateInformationPage {
    constructor(public page: Page) {}

    currentPasswordInputField = '#current-password';
    newPasswordInputField = '#password';
    confirmNewPasswordInputField = '#password-confirmation';
    saveBtn = "button[class*='save primary']";

    async fillCurrentPasswordInputField(currentPassword: string) {
        await this.page.waitForSelector(this.currentPasswordInputField);
        await this.page.locator(this.currentPasswordInputField).type(currentPassword);
    }

    async fillNewPasswordInputField(newPassword: string) {
        await this.page.waitForSelector(this.newPasswordInputField);
        await this.page.locator(this.newPasswordInputField).type(newPassword);
    }

    async fillConfirmNewPasswordInputField(confirmNewPassword: string) {
        await this.page.waitForSelector(this.confirmNewPasswordInputField);
        await this.page.locator(this.confirmNewPasswordInputField).type(confirmNewPassword);
    }

    async clickSaveBtn() {
        await this.page.click(this.saveBtn);
    }
}
