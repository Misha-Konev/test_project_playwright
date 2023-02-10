import { test as baseTest } from '@playwright/test';
import LoginPage from '../pages/login.page';
import MainPage from '../pages/main.page';
import ItemPage from '../pages/item.page';
import CartPage from '../pages/cart.page';
import SalePage from '../pages/sale.page';
import ProductTeesPage from '../pages/tees.page';
import FormPage from '../pages/form.page';
import BasePage from '../pages/basePage.page';
import AccountPage from '../pages/account.page';
import UpdateInformationPage from '../pages/updateInformation.page';
import RegistrationPage from '../pages/registration.page';
import ExtendedSearchPage from '../pages/extendedSearch.page';
import WishListPage from '../pages/wishList.page';

type pages = {
  authorizationPage: LoginPage;
  mainPage: MainPage;
  productPage: ItemPage;
  cartPage: CartPage;
  salePage: SalePage;
  productTeesPage: ProductTeesPage;
  formPage: FormPage;
  basePage: BasePage;
  myAccountPage: AccountPage;
  editAccountInformationPage: UpdateInformationPage;
  signInPage: RegistrationPage;
  advancedSearchPage: ExtendedSearchPage;
  myWishListPage: WishListPage;
};

const testPages = baseTest.extend<pages>({
  authorizationPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ItemPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  salePage: async ({ page }, use) => {
    await use(new SalePage(page));
  },

  productTeesPage: async ({ page }, use) => {
    await use(new ProductTeesPage(page));
  },

  formPage: async ({ page }, use) => {
    await use(new FormPage(page));
  },

  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  myAccountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },

  editAccountInformationPage: async ({ page }, use) => {
    await use(new UpdateInformationPage(page));
  },

  signInPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },

  advancedSearchPage: async ({ page }, use) => {
    await use(new ExtendedSearchPage(page));
  },

  myWishListPage: async ({ page }, use) => {
    await use(new WishListPage(page));
  },
});

export const test = testPages;
export const expect = testPages.expect;
