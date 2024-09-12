import { test, expect, chromium } from "@playwright/test";

test("Swag Labs login", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/index.html");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
  const expHeader = await page.locator("div.product_label").textContent();
  expect(expHeader).toBe("Products");
  console.log(expHeader);
});
test("Browser launching", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.saucedemo.com/v1/index.html");
  await browser.close();
});
