import { test, expect } from "@playwright/test";

test.describe("demo test", () => {

  test.beforeEach("login before tests", async ({ page }) => {

    await page.goto("https:katalon-demo-cura.herokuapp.com/");
    await page.getByRole("link", { name: "Make Appointment" }).click();

    //1.verify title
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("h1")).toHaveText("CURA Healthcare Service");
    await page.getByRole("link", { name: "Make Appointment" }).click();
     await expect(
      page.getByText("Please login to make appointment."),
    ).toBeVisible();

  });

  test("Demo test", { tag: "@smoke" }, async ({ page }, testinfo) => {
    await page.goto("https:katalon-demo-cura.herokuapp.com/");
    await expect(page.locator("h1")).toHaveText("CURA Healthcare Service");
  });

  test("login with invalid creds", async ({ page }) => {


    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe123");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("--ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("#login"))
      //assert
      .toHaveText(
        "Login failed! Please ensure the username and password are valid.",
      );
  });

  test("login with valid", async ({ page }) => {
    
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    await page.locator("#menu-toggle").click();
    await page.getByRole("link", { name: "Logout" }).click();
    await expect(page.locator("h1")).toContainText("CURA Healthcare Service");
  });
});
