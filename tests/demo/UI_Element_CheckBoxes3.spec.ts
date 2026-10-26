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

  test("UI Elements -CheckBoxes -check all ", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();
    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .uncheck({ force: true });
    console.log(
      await page.getByRole("checkbox", { name: "Hide on click" }).isChecked(),
    );
    const allchckcboxes = page.getByRole("checkbox");

    for (let box of await allchckcboxes.all()) {
      console.log(await box.isChecked());
      await box.check({ force: true });
      await expect(box).toBeChecked();
    }
  });

  test("UI Elements -CheckBoxes -uncheck all ", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();
    await page
      .getByRole("checkbox", { name: "Hide on click" })
      .uncheck({ force: true });

    const allchckcboxes = page.getByRole("checkbox");

    for (let box of await allchckcboxes.all()) {
      console.log(await box.isChecked());
      await box.uncheck({ force: true });
      await expect(box).not.toBeChecked();
    }
  });
});
