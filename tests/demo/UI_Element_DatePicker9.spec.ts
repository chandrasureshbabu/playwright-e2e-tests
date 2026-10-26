import { test, expect } from "@playwright/test";

test.describe("form layout page", () => {
  test.beforeEach(
    "Test site launcher for auto wait concept",
    async ({ page }, testinfo) => {
      // Navigate to Datepicker page
      await page.goto(
        "https://playground.bondaracademy.com/pages/forms/layouts",
      );

      // ✅ Verify page loaded successfully
      await expect(page).toHaveURL(
        "https://playground.bondaracademy.com/pages/forms/layouts",
      );

      // ✅ Verify URL contains '/forms'
      await expect(page).toHaveURL(/.*\/forms/);

      // Increase timeout by 5 seconds for all tests in this suite
      testinfo.setTimeout(testinfo.timeout + 5000);
    },
  );

  test("webtables concept", async ({ page }) => {
    // ==========================
    // Navigate to Datepicker Page
    // ==========================

    await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();

    // Locate date picker input field
    const datefield = page.getByPlaceholder("Form Picker");

    // Open calendar popup
    await datefield.click();

    // ==========================
    // Dynamic Date Calculation
    // ==========================

    // Create Date object with current system date
    const date = new Date();

    // Add 5 days to today's date
    // Example:
    // Today = Oct 6
    // Result = Oct 11
    date.setDate(date.getDate() + 5);

    // Extract day portion
    // Example: 11
    const expected_DateDay = date.getDate().toString();

    // Extract month in short format
    // Example: Oct
    const expected_DateMonth = date.toLocaleString("En-US", {
      month: "short",
    });

    // Extract year
    // Example: 2026
    const expected_DateYear = date.getFullYear();

    // Construct expected value exactly as Datepicker displays it
    // Example:
    // "Oct 11, 2026"
    const expectedDate = `${expected_DateMonth} ${expected_DateDay}, ${expected_DateYear}`;

    console.log(`Expected Date: ${expectedDate}`);

  
    

    await page
      .locator(".day-cell:not(.bounding-month)")
      .getByText(expected_DateDay, { exact: true })
      .click();

    

    await expect(datefield).toHaveValue(expectedDate);
  });
});
