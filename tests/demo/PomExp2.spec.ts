import { test, expect } from "@playwright/test";
import { NavigateionPage } from "../../PageObjects/navigation-page";
import { FormslayoutPage } from "../../PageObjects/Forms-page";

test.describe("Pom_Framework", () => {
  test.beforeEach("navigate to test Site:", async ({ page }, testinfo) => {
    await page.goto("https://playground.bondaracademy.com/pages/forms/layouts");

    // ✅ Navigation assertions
    await expect(page).toHaveURL("https://playground.bondaracademy.com/pages/forms/layouts");
   // await expect(page).toHaveURL(/.*bondaracademy/);

    // Extend the timeout for this test dynamically
    // testinfo.setTimeout(testinfo.timeout + 5000) → adds 5s extra to the default timeout
    testinfo.setTimeout(testinfo.timeout + 5000);
  });

  test('Navigate Forms page',async({page})=>{
    const formsPageLayout = new FormslayoutPage(page);
    await formsPageLayout.submitInline_form("suresh","test@test.com",true)
    await formsPageLayout.SubmittingUsinggrid("test@text.com","password1234","Option 1")
  })
});
