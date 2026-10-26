import { test, expect } from "@playwright/test";

test("Extracting text from fields", async ({ page }) => {
  await page.goto("https://playground.bondaracademy.com/pages/forms/layouts");

  // ✅ Assert navigation worked
  await expect(page).toHaveURL("https://playground.bondaracademy.com/pages/forms/layouts");
  await expect(page).toHaveURL(/.*\/forms/);

  // 🔹 General assertions
  const button_fromBasicFormSection = page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("button");

  // Extract visible text and assert equality
  const button_name = await button_fromBasicFormSection.textContent();
  expect(button_name).toEqual("Sign in"); // Direct value assertion

  // 🔹 Locator assertions
  // These assertions are preferred because they:
  // - Auto-wait until the element is ready (visible, stable, attached)
  // - Retry until the condition is met, reducing flakiness
  // - Are more resilient in dynamic/reactive UIs
  await expect(button_fromBasicFormSection).toHaveText("Sign in");       // Exact match
  await expect(button_fromBasicFormSection).toContainText("Sign in");   // Partial match

  // 🔹 Soft assertion
  // Soft assertions allow the test to continue even if the check fails.
  // Useful for non-critical validations or exploratory checks.
  await expect.soft(button_fromBasicFormSection).toHaveText("Sign inn"); // Will fail but test continues

  // 🔹 Action after assertions
  await button_fromBasicFormSection.click();
});
