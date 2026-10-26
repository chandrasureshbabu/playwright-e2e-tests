import { test, expect } from "@playwright/test";

test.describe("form layout page", () => {

  test.beforeEach(
    "Test site launcher for auto wait concept",
    async ({ page }, testinfo) => {

      // Navigate to the Bondar Academy playground site
      await page.goto(
        "https://playground.bondaracademy.com/pages/forms/layouts"
      );

      // ✅ Navigation Assertions
      // Verify exact URL after page load
      await expect(page).toHaveURL(
        "https://playground.bondaracademy.com/pages/forms/layouts"
      );

      // Verify URL contains '/forms'
      await expect(page).toHaveURL(/.*\/forms/);

      // Extend test timeout by 5 seconds for this test execution
      testinfo.setTimeout(testinfo.timeout + 5000);
    },
  );

  test("webtables concept", async ({ page }) => {

    // ==========================
    // Navigation through Menu
    // ==========================

    // Click Forms menu item from left navigation
    await page.getByText("Forms").click();

    // Navigate to Datepicker page
    await page.getByText("Datepicker").click();

    // ==========================
    // Date Picker Handling
    // ==========================

    // Locate date picker input using placeholder text
    await page.getByPlaceholder("Form Picker").click();

    /**
     * Locator Breakdown:
     *
     * .day-cell
     *  - Finds all calendar date cells.
     *
     * :not(.bounding-month)
     *  - Excludes dates belonging to previous/next months.
     *
     * getByText('2', { exact: true })
     *  - Selects only date "2"
     *  - Prevents matching values like 12, 20, 21, 22, etc.
     */
    await page
      .locator(".day-cell:not(.bounding-month)")
      .getByText("2", { exact: true })
      .click();

    // ==========================
    // Locator Assertion
    // ==========================

    /**
     * toHaveValue()
     *
     * Locator Assertion Benefits:
     * ✅ Auto-retries until value appears
     * ✅ Auto-waits for UI updates
     * ✅ Less flaky than inputValue() + expect()
     * ✅ Recommended Playwright approach
     */

    await expect(
      page.getByPlaceholder("Form Picker")
    ).toHaveValue("Oct 2, 2026");

  });
});