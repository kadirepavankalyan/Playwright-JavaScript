import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage.js";
import HomePage from "../pages/HomePage.js";
import InventoryPage from "../pages/InventoryPage.js";
import ProductPage from "../pages/ProductPage.js";

test.describe("Swag Labs", () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  test("should login with valid credentials", async () => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(loginPage.page).toHaveURL(
      "https://www.saucedemo.com/v1/inventory.html"
    );
  });
  test("should login with invalid credentials", async () => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("locked_out_user", "secret_sauce");
    const error = await loginPage.getErrorMessage();
    console.log(error);
    expect(error).toEqual(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
  test("should login with valid credentials and logout", async () => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(loginPage.page).toHaveURL(
      "https://www.saucedemo.com/v1/inventory.html"
    );
    await homePage.clickOnMenu();
    await homePage.clickOnLogout();
    await expect(loginPage.page).toHaveURL(
      "https://www.saucedemo.com/v1/index.html"
    );
  });
  test("Adding product to the cart", async () => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(loginPage.page).toHaveURL(
      "https://www.saucedemo.com/v1/inventory.html"
    );
    const productCount = await inventoryPage.getProductCount();
    console.log("count: " + productCount);

    for (let i = 0; i < productCount; i++) {
      await inventoryPage.clickProductAtIndex(i);
      await productPage.addToCart();
      await productPage.clickOnBack();
    }

    await homePage.clickOnCartIcon();
    await productPage.clickOnCheckout();

    await expect(loginPage.page).toHaveURL("https://www.saucedemo.com/v1/checkout-step-one.html");
    await productPage.addDetails("Surya","Che","560061");
    await productPage.clickOnFinish();
    const confirmMessage = await productPage.confirmationMessageOnFinishOrder();
    console.log(confirmMessage);
    expect(confirmMessage).toEqual("THANK YOU FOR YOUR ORDER");
  });
});
