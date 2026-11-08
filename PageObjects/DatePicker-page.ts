import { Page, expect } from "@playwright/test";
import { step } from "../Helpers/test-step-decorator";
import { BaseHelper } from "./base-helper";

export class DatePickerPage extends BaseHelper {
  //private readonly page: Page;
  constructor(page: Page) {
    //this.page = page;
    super(page);
    console.log("In date Picker page");
  }

  private async selectDate(Days: number) {
    // Locate date picker input field
    const datefield = this.page.getByPlaceholder("Form Picker");
    // Open calendar popup
    await datefield.click();
    const date = new Date();
    date.setDate(date.getDate() + Days);

    const expected_DateDay = date.getDate().toString();
    const expected_DateMonth = date.toLocaleString("En-US", {
      month: "short",
    });

    const expected_DateMonth_Full = date.toLocaleString("En-US", {
      month: "long",
    });

    const expected_DateYear = date.getFullYear();
    const expectedDate = `${expected_DateMonth} ${expected_DateDay}, ${expected_DateYear}`;
    console.log(`Expected Date: ${expectedDate}`);

    let site_currentMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    console.log("Current Month and Year:", site_currentMonthAndYear);
    const expected_YearandMonth = `${expected_DateMonth_Full} ${expected_DateYear}`;
    console.log("Expected Year and Month :", expected_YearandMonth);
    while (!site_currentMonthAndYear?.includes(expected_YearandMonth)) {
      // Click the Next Month arrow in the calendar
      await this.page
        .locator("nb-calendar-pageable-navigation button.next-month")
        .click();

      // Re-read the calendar header after navigation
      // Example: "OCTOBER 2026" -> "NOVEMBER 2026"
      site_currentMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }
    await this.page
      .locator(".day-cell:not(.bounding-month)")
      .getByText(expected_DateDay, { exact: true })
      .click();
    return expectedDate;
  }
  @step
  async Enterdate(InitDate: number) {
    const datefield = this.page.getByPlaceholder("Form Picker");
    await datefield.click();
    const expectedDate = await this.selectDate(InitDate);
    console.log("date selected:", expectedDate);
    await expect(datefield).toHaveValue(expectedDate);
    const toasterMessage = await this.getToaster_Message();
    console.log("Toaster Message from date picker page:", toasterMessage);
  }
  @step
  async selectDate_range(StartDate: number, EndDate: number) {
    const datefield = this.page.getByPlaceholder("Range Picker");
    await datefield.click();
    const expected_StartDate = await this.selectDate(StartDate);
    const expected_endDate = await this.selectDate(EndDate);
    const expectedrangedate = `${expected_StartDate} - ${expected_endDate}`;
    console.log('expecteddate_rage',expectedrangedate)
    //console.log(await datefield.))
    //await expect(datefield).toHaveValue(expectedrangedate);
  }
  @step
  async test_Enterdate(NoOfdays: number) {
    // Locate date picker input field
    const datefield = this.page.getByPlaceholder("Form Picker");
    // Open calendar popup
    await datefield.click();

    // ==========================
    // Dynamic Date Calculation
    // ==========================

    // Create Date object with current system date
    const date = new Date();

    // Add 5 days to today's date
    // Example:
    // Today = Oct 6
    // Result = Oct 11
    date.setDate(date.getDate() + NoOfdays);
    // Extract day portion
    // Example: 11
    const expected_DateDay = date.getDate().toString();
    // Extract month in short format
    // Example: Oct
    const expected_DateMonth = date.toLocaleString("En-US", {
      month: "short",
    });
    const expected_DateMonth_Full = date.toLocaleString("En-US", {
      month: "long",
    });
    // Extract year
    // Example: 2026
    const expected_DateYear = date.getFullYear();
    // Construct expected value exactly as Datepicker displays it
    // Example:
    // "Oct 11, 2026"
    const expectedDate = `${expected_DateMonth} ${expected_DateDay}, ${expected_DateYear}`;
    console.log(`Expected Date: ${expectedDate}`);

    // ==========================
    // Calendar Date Selection
    // ==========================

    let site_currentMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    console.log("Current Month and Year:", site_currentMonthAndYear);
    const expected_YearandMonth = `${expected_DateMonth_Full} ${expected_DateYear}`;
    console.log("Expected Year and Month :", expected_YearandMonth);

    // Keep navigating to next month until calendar header matches
    // the expected month and year calculated from the future date.
    while (!site_currentMonthAndYear?.includes(expected_YearandMonth)) {
      // Click the Next Month arrow in the calendar
      await this.page
        .locator("nb-calendar-pageable-navigation button.next-month")
        .click();

      // Re-read the calendar header after navigation
      // Example: "OCTOBER 2026" -> "NOVEMBER 2026"
      site_currentMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }
    await this.page
      .locator(".day-cell:not(.bounding-month)")
      .getByText(expected_DateDay, { exact: true })
      .click();

    /**
     * Locator Assertion Benefits
     * ✅ Auto-waits,     * ✅ Auto-retries ,     * ✅ Less flaky ,     * ✅ Recommended Playwright approach
     * Playwright keeps checking until:
     * Input value === expectedDate
     */

    await expect(datefield).toHaveValue(expectedDate);
  }
}
