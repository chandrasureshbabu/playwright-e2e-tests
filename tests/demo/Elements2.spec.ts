import { test, expect } from "@playwright/test";

// This suite demonstrates traversing from a unique parent element down to child elements
test.describe("this is to traverse the from unique parent elemnt to child elements ", () => {

  test.beforeEach("navigating to test site", async ({ page }) => {
    await page.goto("https://playground.bondaracademy.com/pages/forms/layouts");
    // Assert navigation worked
    await expect(page).toHaveURL("https://playground.bondaracademy.com/pages/forms/layouts");
    await expect(page).toHaveURL(/.*\/forms/);
  });

  test("unique parent element to child elements", async ({ page }) => {
    // ✅ Using locator with hasText → find nb-card that contains text "Using the Grid"
    // Then traverse to its child button
    await page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("button").click();

    // ✅ Same as above, but explicitly match button by accessible name "Sign in"
    await page.locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("button", { name: "Sign in" })
      .click();

    // ✅ Using locator with has → find nb-card that contains a child element (#inputEmail1)
    // Then click its button
    await page.locator("nb-card", { has: page.locator("#inputEmail1") })
      .getByRole("button")
      .click();

    // ✅ Using filter({ hasText }) → alternative way to filter parent by text
    await page.locator("nb-card")
      .filter({ hasText: "Using the Grid" })
      .getByRole("button")
      .click();

    // ✅ Combining multiple filters:
    // - has: ensures nb-card contains a checkbox
    // - hasText: ensures it also contains "Sign in"
    // Then click its button
    await page.locator("nb-card")
      .filter({ has: page.locator("nb-checkbox") })
      .filter({ hasText: "Sign in" })
      .getByRole("button")
      .click();

    // ✅ Using DOM traversal:
    // getByText("Using the Grid") → finds the text node
    // locator("..") → goes up one level to its parent
    // Then find the button inside that parent
    await page.getByText("Using the Grid").locator("..").getByRole("button").click();
  });
});
