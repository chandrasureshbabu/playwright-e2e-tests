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

  test("Browser Dialogs Handling", async ({ page }) => {
    //select row by  visisble text
    await page.getByText("Tables & Data").click();
    await page.getByText("Smart Table").click();

    const tablerowByText = page.getByRole("row", {
      name: "twitter@outlook.com",
    });
    await tablerowByText.locator(".nb-edit").click();
    await tablerowByText.getByPlaceholder("Age").fill("35");
    await tablerowByText.locator(".nb-checkmark").click();

    //get row by specific column value
    const tablerowId = page
      .getByRole("row")
      .filter({ has: page.getByRole("cell").nth(1).getByText("10") });
    await tablerowId.locator(".nb-edit").click();
    await page
      .locator("tbody")
      .getByPlaceholder("E-mail")
      .fill("test@test.com");
    await page.locator("tbody").locator(".nb-checkmark").click();
    await expect(tablerowId.locator("td").nth(5)).toHaveText("test@test.com");

    //loop throgh the table rows
    const ages = ["20", "30", "40", "200"];
    for (let age of ages) {
      await page.getByPlaceholder("Age").fill(age);
      console.log(age);
      // await expect(
      //   page.locator("tbody tr").first().locator("td").last(),
      // ).toHaveText(age);
      //await expect(page.getByPlaceholder("Age")).toHaveText(age)
      if (age === "200") {
        await expect(page.locator("tbody")).toHaveText("No data found ");
      } else {
        await expect(
          page.locator("tbody tr").first().locator("td").last(),
        ).toHaveText(age);
        const allrows = await page.locator("tbody tr").all();
        for (let row of allrows) {
          await expect(row.locator("td").last()).toHaveText(age);
        }
      }
    }
  });
});
