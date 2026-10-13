
import { test, expect } from "@playwright/test";
import { json } from "zod";
test.only("Should demo locators", async ({ page }) => {

  // `page.getBy*()` and `page.locator()` methods return the `locator` object
  // The above methods are not to be `awaited`
  // The type of locator is an `object`
  // Locators are LAZY until an action is fired on them
  console.log("this is test executed with test.only");

  page.goto("https://katalon-demo-cura.herokuapp.com/");

  // `page.getBy*()`
  let mkapmnet= page.getByRole("link",{name:'Make Appointment'})
  console.log(`type of locator:${typeof mkapmnet} and value of locator mkapmnet ${JSON.stringify(mkapmnet)} `)
  mkapmnet.click();
  await expect(page.getByText("Please login to make appointment.")).toBeVisible();



  

});

test("Should demo locators _", async ({ page }) => {
    console.log("this will not be executed as test.only is used in the above test");
});

