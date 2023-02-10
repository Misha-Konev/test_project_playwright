import { test } from '../fixture/fixture';
import { userData } from '../data_folder/dataForTests';
import { pageTitles } from '../data_folder/pageTitles';
import { errorMessages } from '../data_folder/errorMessages';

test.describe('Login tests for mageto web site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('c1 Creating account and then logout', async ({
    authorizationPage,
    basePage,
  }) => {
    await authorizationPage.clickCreateAccountLink();
    await basePage.verifyPageTitleText(pageTitles.createNewCustomer);
    await authorizationPage.fillFirstNameInputField(userData.firstName);
    await authorizationPage.fillLastNameInputField(userData.lastName);
    await authorizationPage.fillEmailInputField(userData.email);
    await authorizationPage.fillPasswordInputField(userData.password);
    await authorizationPage.fillPasswordConfirmInputField(userData.password);
    await authorizationPage.clickCreateAccountBtn();
    await authorizationPage.verifyWelcomeUserText(
      userData.firstName,
      userData.lastName
    );
    await authorizationPage.clickLogOutBtn();
    await basePage.verifyPageTitleText(pageTitles.youAreSignOut);
  });

  test('c2 Reset password and Log in with new password', async ({
    page,
    basePage,
    authorizationPage,
    myAccountPage,
    editAccountInformationPage,
    signInPage,
  }) => {
    await authorizationPage.clickCreateAccountLink();
    await authorizationPage.fillFirstNameInputField(userData.firstName);
    await authorizationPage.fillLastNameInputField(userData.lastName);
    await authorizationPage.fillEmailInputField(userData.email);
    await authorizationPage.fillPasswordInputField(userData.password);
    await authorizationPage.fillPasswordConfirmInputField(userData.password);
    await authorizationPage.clickCreateAccountBtn();
    await basePage.verifyPageTitleText(pageTitles.myAccount);
    await myAccountPage.clickChangePasswordBtn();
    await basePage.verifyPageTitleText(pageTitles.editAccountInformation);
    await editAccountInformationPage.fillCurrentPasswordInputField(
      userData.password
    );
    await editAccountInformationPage.fillNewPasswordInputField(
      userData.newPassword
    );
    await editAccountInformationPage.fillConfirmNewPasswordInputField(
      userData.newPassword
    );
    await editAccountInformationPage.clickSaveBtn();
    // waiting for loading Sign-in page
    await page.waitForSelector(signInPage.signInButton);
    await basePage.verifyPageTitleText(pageTitles.customerLogin);
    await signInPage.fillEmailInputField(userData.email);
    await signInPage.fillPasswordInputField(userData.password);
    await signInPage.clickSignInBtn();
    await basePage.verifyErrorMessageIsDisplayed(
      errorMessages.theAccountSignInWasIncorrect
    );
    await signInPage.fillPasswordInputField(userData.newPassword);
    await signInPage.clickSignInBtn();
    await authorizationPage.verifyWelcomeUserText(
      userData.firstName,
      userData.lastName
    );
  });
});
