import { test, expect } from "@playwright/test";

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

test("Timesouts", async ({ page }) => {
  // 🔹 Override timeout for this specific test
  test.setTimeout(7000); // sets max duration of this test to 7s

  // 🔹 Mark test as slow → Playwright multiplies timeout by 3 for this test
  test.slow();

  const nav_menu = page.locator("nb-menu").getByText("Modal & Overlays");
  await nav_menu.click();

  await page.getByRole("link", { name: "Dialog" }).click();
  await page.getByText("Open with delay 3 seconds").click();

  const dialog_container = page.locator("nb-dialog-container");
  const Button_ok = dialog_container.getByRole("button", { name: "OK" });

  // 🔹 Action-level timeout → overrides default action timeout for this click
  await Button_ok.click({ timeout: 5000 });
});
