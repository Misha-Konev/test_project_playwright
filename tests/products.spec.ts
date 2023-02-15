import { test } from '../fixture/fixture';
import { data } from '../data_folder/dataForTests';
import { pageTitles } from '../data_folder/pageTitles';
import { errorMessages } from '../data_folder/errorMessages';
import { colors, numberSizes, letterSizes, productItems } from '../data_folder/itemDetails';
import { sort, sortingDirections } from '../data_folder/sort';

test.describe('Products tests for mageto web site', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('C3 Banners & content is displayed on the main page', async ({ page, mainPage }) => {
        await page.waitForLoadState('domcontentloaded');
        await mainPage.verifyBannersAreVisible();
        await mainPage.verifyLogoIsVisible();
    });

    test('C5 Verify item is added to the cart with the correct color and size', async ({
        page,
        productPage,
        cartPage
    }) => {
        const productDetails: string[] = [numberSizes.twentyEightSize, colors.red];
        await page.goto('/promotions/pants-all.html');
        await productPage.selectProductItem(productItems.emmaLeggins);
        await productPage.verifyMoreInformationVisible();
        await productPage.verifyReviewsVisible();
        await productPage.selectProductItemColor(colors.red);
        await productPage.selectProductItemSize(numberSizes.twentyEightSize);
        await productPage.clickAddToCartBtn();
        await page.waitForSelector(productPage.addedProductToCartAlert);
        await cartPage.openCartPage();
        await cartPage.verifyProductItemSizeColor(productDetails);
    });

    test('C6 Add the most expensive one to the cart', async ({
        page,
        basePage,
        productPage,
        cartPage
    }) => {
        await page.goto('/collections/eco-friendly.html');
        await basePage.searchForText(productItems.searchItems);
        await basePage.verifySearchResultsForLabel(productItems.searchItems);
        await basePage.sortByValue(sort.price);
        await basePage.setSortingDirection(sortingDirections.ascending);
        await basePage.clickFirstProductItem();
        await productPage.selectProductItemColor(colors.green);
        await productPage.selectProductItemSize(letterSizes.Lsize);
        await productPage.clickAddToCartBtn();
        await page.waitForSelector(productPage.addedProductToCartAlert);
        await cartPage.openCartPage();
        await cartPage.verifyProductItemSizeColor([letterSizes.Lsize, colors.green]);
    });

    test('C7 Verify each item has image/reviews/price / that ‘Add to cart ’ appears on mouseover \n', async ({
        page,
        salePage,
        productTeesPage
    }) => {
        await page.goto('/sale.html');
        await salePage.clickSidebarTeesBtn();
        await productTeesPage.verifyTeesDetailsOnMouseOverAreVisible();
    });

    test('C8 Sort items by product name and price in descending and ascending directions', async ({
        page,
        basePage
    }) => {
        await page.goto('/gear/bags.html');
        await basePage.sortByValue(sort.price);
        await basePage.setSortingDirection(sortingDirections.descending);
        await basePage.verifyProductsAreSortedByPriceAscending();
        await basePage.setSortingDirection(sortingDirections.ascending);
        await basePage.verifyProductsAreSortedByPriceAscending(false);
        await basePage.setProductLimiter(sort.limiter);
        await basePage.sortByValue(sort.productName);
        await basePage.verifyProductsAreSortedByProductNameAscending(false);
        await basePage.setSortingDirection(sortingDirections.descending);
        await basePage.verifyProductsAreSortedByProductNameAscending();
    });

    test('C9 Submit the form with a non-existing order id and the rest valid data', async ({
        page,
        formPage,
        basePage
    }) => {
        await page.goto('/sales/guest/form/');
        await formPage.fillOrderIdField(data.fakeOrderId);
        await formPage.fillBillingLastNameField(data.lastName);
        await formPage.selectOptionInFindOrderByField('email');
        await formPage.fillEmailField(data.email);
        await formPage.clickContinueBtn();
        await basePage.verifyErrorMessageIsDisplayed(errorMessages.youEnteredIncorrectData);
        await formPage.fillOrderIdField(data.orderId);
        await formPage.fillBillingLastNameField(data.lastName);
        await formPage.selectOptionInFindOrderByField('email');
        await formPage.fillEmailField(data.email);
        await formPage.clickContinueBtn();
        await page.waitForLoadState();
        await basePage.verifyPageTitleText(pageTitles.orderNumberTitle(data.orderId));
    });

    test('C10 Submit the form with any random data', async ({
        page,
        basePage,
        advancedSearchPage
    }) => {
        await page.goto('/catalogsearch/advanced/');
        await advancedSearchPage.fillProductNameInputField(colors.red);
        await advancedSearchPage.fillSkuInputField(letterSizes.Lsize);
        await advancedSearchPage.fillDescriptionInputField(numberSizes.twentyEightSize);
        await advancedSearchPage.fillPriceFromInputField('0');
        await advancedSearchPage.fillPriceToInputField('1000');
        await advancedSearchPage.clickSearchBtn();
        await basePage.verifyPageTitleText(pageTitles.catalogAdvancedSearch);
        await basePage.verifyErrorMessageIsDisplayed(
            errorMessages.weCantFindItemsMatchingTheseSearchCriteria
        );
    });
});
