import { test, expect } from "@playwright/test";

/**
 * Locator Strategy Notes:
 * | Locator Type   | Example                                      | Best Use Case                          |
 * | -------------- | -------------------------------------------- | -------------------------------------- |
 * | getByRole      | page.getByRole('button', { name: 'Login' })  | Accessible, semantic UI elements        |
 * | getByLabel     | page.getByLabel('Username')                  | Forms and inputs tied to labels         |
 * | getByText      | page.getByText('Checkout')                   | Buttons/links with visible text         |
 * | locator(css)   | page.locator('.inventory_item_price')        | Raw HTML targeting, fallback            |
 *
 * Best Practice:
 * - Prefer role-based locators → more resilient and aligned with accessibility.
 * - Use label/text locators for form fields and visible actions.
 * - Fall back to CSS locators only when semantic roles aren’t available.
 * 
 * Key Explanations
      getByRole → Best for buttons, links, checkboxes (semantic + accessible).

      getByLabel → Perfect for form inputs tied to <label>.

      getByPlaceholder → Targets inputs with placeholder text.

      getByText → Finds elements by visible text content.

      getByTestId → Targets custom data-testid attributes (common in React apps).

      locator(css) → Raw CSS fallback when semantic locators aren’t available.

      .nth() → Selects a specific element from a list (e.g., 3rd card).
 */

test.describe("elements handling Concept1", () => {

  test.beforeEach("launching test site", async ({ page }) => {
    await page.goto("https://playground.bondaracademy.com/pages/forms/layouts");
    // Assert navigation worked
    await expect(page).toHaveURL(/.*\/forms/);
    await expect(page).toHaveURL("https://playground.bondaracademy.com/pages/forms/layouts");
  });

  test("getBy.. and Child elements", async ({ page }) => {
    // getByRole → semantic locator for button
    await page.getByRole("button", { name: "Sign in" }).first().click();

    // getByRole → textbox with accessible name "Email"
    await page.getByRole("textbox", { name: "Email" }).first().fill("chandra.nemani");

    // getByLabel → form input tied to label "Password"
    await page.getByLabel("Password").first().fill("chandra.nemani");

    // getByPlaceholder → input with placeholder text
    await page.getByPlaceholder("jane Doe").fill("chandra.nemani");

    // getByText → finds element with visible text "Submit"
    await page.getByText("Submit").first().click();

    // getByTestId → custom test id attribute
    await page.getByTestId("inputEmail1").fill("nemani.chandra@gmali.com");

    // getByTitle → element with title attribute (commented out)
    // await page.getByTitle('IoT Dashboard').click()

    // ❌ Incorrect usage (mixing CSS + text-is)
    // await page.locator('nb-card').locator('nb-radio-group').locator(':text-is:("Option 1")').click()

    // ✅ Correct usage: use getByText instead of :text-is
    await page.locator('nb-card').locator('nb-radio-group').getByText("Option 2").click();

    // nth() → select the 3rd nb-card, then getByRole for button inside
    await page.locator("nb-card").nth(2).getByRole("button").click();
  });
});
