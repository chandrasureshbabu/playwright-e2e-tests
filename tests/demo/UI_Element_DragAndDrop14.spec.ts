import { test, expect } from "@playwright/test";

test.describe("form layout page", () => {
  test.beforeEach(
    "Test site launcher for auto wait concept",
    async ({ page }, testinfo) => {
      await page.goto(
        "https://playground.bondaracademy.com/pages/forms/layouts",
      );

      // ✅ Navigation assertions
      await expect(page).toHaveURL(
        "https://playground.bondaracademy.com/pages/forms/layouts",
      );
      await expect(page).toHaveURL(/.*\/forms/);

      // 🔹 Extend timeout dynamically for this test
      // testinfo.setTimeout(testinfo.timeout + 5000) → adds 5s extra to the default timeout
      testinfo.setTimeout(testinfo.timeout + 5000);
    },
  );

  test("Drag and Drop1 ", async ({ page }) => {
    //navigate to drag  and Drop control page
    await page.getByText("Extra Components").click();
    await page.getByText("Drag & Drop").click();

    //option1
    await page.getByText(" Get groceries ").dragTo(page.locator("#drop-list"));

    //option2
    await page.getByText(" Feed the dog ").hover();
    await page.mouse.down();
    await page.locator("#drop-list").hover();
    await page.mouse.up();
  });

  test("Drag and Drop2 ", async ({ page }) => {
    //navigate to drag  and Drop control page
    await page.getByText("Extra Components").click();
    await page.getByText("Drag & Drop").click();

    //option2
    await page.getByText(" Feed the dog ").hover();
    await page.mouse.down();
    await page.locator("#drop-list").hover();
    await page.mouse.up();
  });
});
