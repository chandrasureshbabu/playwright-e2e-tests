import { test, expect } from "@playwright/test";
import { NavigateionPage } from "../../PageObjects/navigation-page";
import { FormslayoutPage } from "../../PageObjects/Forms-page";
import { DatePickerPage } from "../../PageObjects/DatePicker-page";
import { PageManager } from "../../PageObjects/page-manger";


test.describe("Pom_Framework", () => {
  test.beforeEach("navigate to test Site:", async ({ page }, testinfo) => {
    await page.goto("https://playground.bondaracademy.com/pages/iot-dashboard");

    // ✅ Navigation assertions
    await expect(page).toHaveURL("https://playground.bondaracademy.com/pages/iot-dashboard");
    await expect(page).toHaveURL(/.*bondaracademy/);

    // Extend the timeout for this test dynamically
    // testinfo.setTimeout(testinfo.timeout + 5000) → adds 5s extra to the default timeout
    testinfo.setTimeout(testinfo.timeout + 5000);
  });

  test('navigate to forms page',async({page})=>{
    
    //pages.Navigate_TO.formLayoutpage()
    //const navigateToForms = new NavigateionPage(page);
    // above lines code not needed when page objects are created in page Manger , we exteing that

    const pages =  new PageManager(page)
    await pages.Navigate_TO.formLayoutpage()
    await pages.Navigate_TO.NvaigateTo_Datepicker()
    await pages.Navigate_TO.NvaigateTo_Dialog()
    await pages.Navigate_TO.NvaigateTo_DragAndDrop()
    await pages.Navigate_TO.NvaigateTo_SMartTable()
    await pages.Navigate_TO.NvaigateTo_Toasterconfiguration()
    await pages.Navigate_TO.NvaigateTo_ToolTip()
    await pages.Navigate_TO.NvaigateTo_DragAndDrop()
    await pages.Navigate_TO.NvaigateTo_Dashboard()
  })

  test('test parametrised- Forms',async({page})=>{
    
    //object of navigations page
    //const navigateToForms = new NavigateionPage(page);
    
    // navigate to formlayout page
    const pages =  new PageManager(page)
    await pages.Navigate_TO.formLayoutpage()

    //const formsPageLayout = new FormslayoutPage(page);
    pages.Forms_Page
    await pages.Forms_Page.submitInline_form("suresh","test@test.com",true)
    await pages.Forms_Page.SubmittingUsingformgrid("test@text.com","password1234","Option 1")

    //navigate to date picker page
    await pages.Navigate_TO.NvaigateTo_Datepicker();
    //const datepage = new DatePickerPage(page)
    //pages.Date_PickerPage
    await pages.Date_PickerPage.Enterdate(5)
    //await pages.Date_PickerPage.selectDate_range(10,70)
    
  })

  test('Paramterised date range selection',async({page})=>{
    const pages =  new PageManager(page)
    await pages.Navigate_TO.NvaigateTo_Datepicker();
    await pages.Date_PickerPage.selectDate_range(20,70)
  })
});
