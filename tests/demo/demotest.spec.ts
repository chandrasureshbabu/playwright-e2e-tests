import { test, expect } from "@playwright/test";

test('demo test', async ({ page }) => {
 // https:katalon-demo-cura.herokuapp.com/"
  await page.goto("https:www.amazon.in/");
  await expect(page).toHaveTitle(/Amazon/);
  await expect(page.locator("h1")).toHaveText("Welcome to Amazon.in");
});


