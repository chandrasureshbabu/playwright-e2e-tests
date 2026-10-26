import { test, expect } from "@playwright/test";

// This suite demonstrates traversing from a unique parent element down to child elements
test.describe("reusing  common elements ", () => {
    
  test.beforeEach("navigating to test site", async ({ page }) => {
    await page.goto("https://playground.bondaracademy.com/pages/forms/layouts");
    // Assert navigation worked
    await expect(page).toHaveURL(
      "https://playground.bondaracademy.com/pages/forms/layouts",
    );
    await expect(page).toHaveURL(/.*\/forms/);
  });

  test("resuing common elements ", async ({ page }) => {
    // ✅ Using locator with hasText → find nb-card that contains text "Using the Grid"
    // Then traverse to its child button
    const basicform =  page.locator("nb-card", { hasText: "Basic form" });
    const email =  basicform.getByLabel("Email");
    const password =  basicform.getByLabel("Password");
    const checkbox_check =  basicform.locator(".custom-checkbox");
    const submit =  basicform.getByText("Submit");

    await email.fill("chandra.nemani@gmail.com");
    await password.fill("password");
    await checkbox_check.click();
    await submit.click();
    await expect(email).toHaveValue('chandra.nemani@gmail.com')
  });
});
