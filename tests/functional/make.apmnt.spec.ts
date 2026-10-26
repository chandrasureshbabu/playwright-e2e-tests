import { expect, Expect, test } from "@playwright/test";

test.describe("make appoinment test", () => {
  test.beforeEach("login to test site", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    /**
     * ELEMENT: Button, Link
     *
     * @actions
     * 1. ✅ Click
     * 2. ✅ Press
     * 3. ✅ Double click
     * 4. ✅ Right click
     * 5. ✅ Hover if link
     * 6. [Optional] timeout if slow
     */

    // 2. 📍Click on the Make Appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    //await page.getByRole("link", { name: "Make Appointment" }).press("Enter")
    //await page.getByRole("link", { name: "Make Appointment" }).dblclick();
    //await page.getByRole("link", { name: "Make Appointment" }).click({ button: "right" });
    //await page.getByRole("link", { name: "Make Appointment" }).hover();
    //await page.getByRole("link", { name: "Make Appointment" }).click({ timeout: 10_000 });

    let pagetitle = page
      .getByText("Please login to make appointment.")
      .isVisible();
    console.log(`navigated to login page:?${pagetitle}`);
    await expect(pagetitle);
  });

  test("test", async ({ page }) => {
    await page.getByLabel("Username").click();

    /*
     * ELEMENT: Text Box
     *
     * @actions
     * 1. ✅ Clear/click before filling
     * 2. ✅ Fill
     * 3. ✅ pressSequentially (Slow typing)
     */

    // 📍Successful login
    // await page.getByLabel("Username").fill("John Doe");

    // Clears and enter
    // await page.getByLabel("Username").clear()
    // await page.getByLabel("Username").fill("John Doe");

    // pressSequentially
    await page
      .getByLabel("Username")
      .pressSequentially("John Doe", { delay: 300 });

    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    /**
     * ELEMENT: Dropdown
     *
     * @actions
     * 1. Assert default option
     * 2. Select by:
     *    - label
     *    - Index
     * 3. Assert the count
     * 4. Get all dropdown values
     *
     * @notes
     * - Selenium - Select class and 3 selectBy* methods
     * - WebdriverIO - 3 selectBy* methods
     */

    // 📍Dropdown

    //dropdown selection
    // Assert default option
    await expect(page.getByLabel("Facility")).toHaveValue(
      "Tokyo CURA Healthcare Center",
    );
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    await page.waitForTimeout(2000); // waits 3 seconds
    // Select by Label or index
    await page
      .getByLabel("Facility")
      .selectOption({ label: "Seoul CURA Healthcare Center" });
    await page.waitForTimeout(1500); // waits 2 seconds
    await page.getByLabel("Facility").selectOption({ index: 0 });
    await page.waitForTimeout(2000); // waits 2 seconds

    // Assert the count
    let drpdwnOptionsEle = page.getByLabel("Facility").locator("option");
    await expect(drpdwnOptionsEle).toHaveCount(3);
    await page.waitForTimeout(2000); // waits 2 seconds

    // Get all dropdown values
    let listOfDrpdwnElems = await page.getByLabel("Facility").all();

    // for ... of loop
    let listOfOptions = [];

    for (let ele of listOfDrpdwnElems) {
      let eleTxt = await ele.textContent();
      if (eleTxt) {
        listOfOptions.push(eleTxt);
      }
    }

    console.log(`>> List of Options: ${listOfOptions}`);

    /**
     * ELEMENT: Checkbox/Radio button
     *
     * @actions
     * 1. Assert the default option - to be checked/unchecked
     * 2. Check/uncheck
     *
     * @notes
     * - Radio button - Allows to select only one option
     * - Checkbox - Allows for multi-entry
     */

    // Checkbox
    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();

    //or
    // await page
    //   .getByRole("checkbox", { name: "Apply for hospital readmission" })
    //   .click();

    //radio button 
    // Assert the default option – to be checked/unchecked
    await expect(page.getByText("Medicare")).toBeChecked();

    await page.getByText("Medicaid").check();
    await expect(page.getByText("Medicare")).not.toBeChecked();
    //or
    //await page.getByRole("radio", { name: "Medicaid" }).click();

    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    // await page
    //   .getByRole("textbox", { name: "Visit Date (Required)" })
    //   .fill("09/05/1989");
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .pressSequentially("09/05/1989", { delay: 300 });
    await page.waitForTimeout(3000); // waits 3 seconds
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .press("Enter");
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("this is muiltpe lines comment fields playwright test site");

    await page.getByRole("button", { name: "Book Appointment" }).click();

    await expect(page.locator("h2")).toContainText("Appointment Confirmation");

    await expect(page.locator("#summary")).toContainText(
      "Please be informed that your appointment has been booked as following:",
    );

    await page.locator("#menu-toggle").click();
    await page.getByRole("link", { name: "Logout" }).click();
    await expect(page.locator("h1")).toContainText("CURA Healthcare Service");
  });
});
