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

  test("UI Element - normalDropDown ", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();
    await page
      .locator(".form-group", { hasText: "Toast type:" })
      .getByRole("combobox")
      .selectOption("info");
    await expect(page.getByRole("combobox")).toHaveValue("info");
  });

  test("UI Element - Custom DropDown  ", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();

    const dropdownField = page
      .locator(".form-group", { hasText: "Position:" })
      .locator("nb-select");
    await dropdownField.click();

    //option1
    //await page.getByRole("list").getByText("top-end").click();


    // //option2
    // await page.locator("nb-option", { hasText: "bottom-left" }).click();
    // await expect(dropdownField).toHaveText("bottom-left");

    // //option3
    // //pulling all one by one
    const allSelectvalues = await page.locator("nb-option").allTextContents();
    console.log(allSelectvalues)
    for (let option of allSelectvalues) {
        console.log(option)
      await page.locator("nb-option", { hasText: option }).click();
      await expect(dropdownField).toHaveText(option);
      await dropdownField.click();
    }
  });
});
