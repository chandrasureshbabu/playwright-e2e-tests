import { test, expect } from "@playwright/test";

test("Extracting text from fields", async ({ page }) => {
  await page.goto("https://playground.bondaracademy.com/pages/forms/layouts");

  // ✅ Assert navigation worked
  await expect(page).toHaveURL("https://playground.bondaracademy.com/pages/forms/layouts");
  await expect(page).toHaveURL(/.*\/forms/);

  // 🔹 Extracting text content from a button inside a unique parent (nb-card with text "Using the Grid")
  const button_name = await page
    .locator("nb-card", { hasText: "Using the Grid" }) // parent locator filtered by text
    .getByRole("button")                              // child locator by role
    .textContent();                                   // extract visible text
  console.log(button_name);

  // 🔹 Extracting multiple values (all radio button labels)
  const radiobutton_names = await page.locator("nb-radio").allTextContents(); 
  // allTextContents() → returns array of visible text for all matched elements
  console.log(radiobutton_names);
  expect(radiobutton_names).toContain("Option 1"); // assertion: ensure "Option 1" exists

  // 🔹 Extracting input field value
  const EmailField = page
    .locator("nb-card", { hasText: "Using the Grid" }) // parent locator
    .getByRole("textbox", { name: "Email" });          // child locator by role + accessible name
  await EmailField.fill("text@gmail.com");             // fill input
  console.log(await EmailField.inputValue());          // inputValue() → get current value of field

  // 🔹 Extracting attribute value (placeholder)
  const EmailFieldPlaceholdervalue = await page
    .locator("nb-card", { hasText: "Using the Grid" }) // parent locator
    .getByRole("textbox", { name: "Email" })           // child locator
    .getAttribute("placeholder");                      // get attribute value
  console.log("Attribute value:", EmailFieldPlaceholdervalue);
});
