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

  test("UI Element - Hover for Tooltip ", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Tooltip").click();
    await page.getByRole("button",{name:'Top'}).hover()
    await expect(page.getByRole('tooltip')).toHaveText('This is a tooltip')
  });


});
