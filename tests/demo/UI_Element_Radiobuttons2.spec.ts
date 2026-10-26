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

  test("RadioButtons", async ({ page }) => {
    const Form1 = page.locator("nb-card", { hasText: "Using the Grid" });

    // 🔹 Using getByLabel → semantic locator for radio button
    // If normal click doesn’t work (due to hidden/overlapping element), use .check({force:true})
    await Form1.getByLabel("Option 1").check({ force: true });

    // 🔹 Using getByRole → semantic locator for radio button with accessible name
    await Form1.getByRole("radio", { name: "Option 2" }).check({ force: true });

    // 🔹 Check status programmatically
    const Option2Status = Form1.getByRole("radio", {
      name: "Option 2",
    }).isChecked();
    expect(Option2Status).toBeTruthy(); // Assert Option 2 is selected

    // 🔹 Locator assertions (preferred)
    // Auto-wait until condition is met, more resilient than static value checks
    await expect(Form1.getByLabel("Option 2")).toBeChecked(); // Assert Option 2 is checked
    await expect(Form1.getByLabel("Option 1")).not.toBeChecked(); // Assert Option 1 is not checked
  });
});
