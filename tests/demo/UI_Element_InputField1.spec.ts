import { test, expect } from "@playwright/test";

test.describe("form layout page", () => {
  test.beforeEach(
    "Test site launcher for auto wait concept",
    async ({ page }, testinfo) => {
      await page.goto("https://playground.bondaracademy.com/pages/forms/layouts");

      // ✅ Navigation assertions
      await expect(page).toHaveURL("https://playground.bondaracademy.com/pages/forms/layouts");
      await expect(page).toHaveURL(/.*\/forms/);

      // 🔹 Extend the timeout for this test dynamically
      // testinfo.setTimeout(testinfo.timeout + 5000) → adds 5s extra to the default timeout
      testinfo.setTimeout(testinfo.timeout + 5000);
    },
  );

  test("input fields", async ({ page }) => {
    // 🔹 Locate Email text field inside nb-card with text "Using the Grid"
    const EmailTextField = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    // 🔹 Fill the input field with value
    await EmailTextField.fill("Testuser@test.com");

    // 🔹 Clear the input field
    await EmailTextField.clear();

    // 🔹 Type text sequentially with delay between keystrokes
    // pressSequentially simulates real typing with delay (500ms per character here)
    await EmailTextField.pressSequentially("Testuser@test.com", { delay: 500 });

    // 🔹 Extract the current value from the input field
    const Email_inputvalue = await EmailTextField.inputValue();

    // 🔹 Assertions
    // Assert that the field contains the exact value we extracted
    await expect(EmailTextField).toHaveValue(Email_inputvalue);

    // Assert that the field value matches regex pattern (ends with test.com)
    await expect(EmailTextField).toHaveValue(/.*test.com/);
  });
});
