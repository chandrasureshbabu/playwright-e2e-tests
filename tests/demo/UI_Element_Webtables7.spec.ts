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

  test("webtables concpet", async ({ page }) => {
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    page.on("dialog", (dialog) => {
      expect(dialog.message()).toEqual("Are you sure you want to delete?");
      dialog.accept();
    });

    await page
      .locator("tr", { hasText: "mdo@gmail.com" })
      .locator(".nb-trash")
      .click();
    await expect(
      page.locator("tr", { hasText: "mdo@gmail.com" }),
    ).not.toBeVisible();
  });
});
