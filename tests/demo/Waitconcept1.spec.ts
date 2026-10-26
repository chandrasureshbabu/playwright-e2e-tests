import { test, expect } from "@playwright/test";

test.beforeEach(
  "Test site launcher for auto wait concept",
  async ({ page }) => {
    await page.goto("https://playground.bondaracademy.com/pages/forms/layouts");
    // Assert navigation worked
    await expect(page).toHaveURL(
      "https://playground.bondaracademy.com/pages/forms/layouts",
    );
    await expect(page).toHaveURL(/.*\/forms/);
  },
);

test(".waitFor()", async ({ page }) => {
  const nav_menu = page.locator("nb-menu").getByText("Modal & Overlays");
  await nav_menu.click();
  await page.getByRole("link", { name: "Dialog" }).click();
  await page.getByText("Open with delay 3 seconds").click();

  const dialog_container = page.locator("nb-dialog-container");
  const Button_ok = dialog_container.getByRole("button", { name: "OK" });

  //it will wait for for button on dialog /alert
  //await Button_ok.click()

  //it will not wait for text on dialog
  //const dialogMessage = await dialog_container.locator('nb-card-header').textContent()
  //expect(dialogMessage).toEqual('Friendly reminder')

  //or  - below lines will failed as it cannot wait for specfic element , then we need to use custom waits for elements
  // const dialogMessage1 = await dialog_container.locator('nb-card-header').allTextContents()
  // expect(dialogMessage1).toContain('Friendly reminder')

  await dialog_container.waitFor();
  const dialogMessage1 = await dialog_container
    .locator("nb-card-header")
    .allTextContents();
  expect(dialogMessage1).toContain("Friendly reminder");
  console.log(dialogMessage1);
  await Button_ok.click();
});

test("page.waitForSelector('locator')", async ({ page }) => {
  const nav_menu = page.locator("nb-menu").getByText("Modal & Overlays");
  await nav_menu.click();
  await page.getByRole("link", { name: "Dialog" }).click();
  await page.getByText("Open with delay 3 seconds").click();

  const dialog_container = page.locator("nb-dialog-container");
  const Button_ok = dialog_container.getByRole("button", { name: "OK" });

  //it will wait for for button on dialog /alert
  //await Button_ok.click()

  //it will not wait for text on dialog
  //const dialogMessage = await dialog_container.locator('nb-card-header').textContent()
  //expect(dialogMessage).toEqual('Friendly reminder')

  //or  - below lines will failed as it cannot wait for specfic element , then we need to use custom waits for elements
  // const dialogMessage1 = await dialog_container.locator('nb-card-header').allTextContents()
  // expect(dialogMessage1).toContain('Friendly reminder')

  // another wait is
  await page.waitForSelector("nb-dialog-container");
  const dialogMessage2 = await dialog_container
    .locator("nb-card-header")
    .allTextContents();
  expect(dialogMessage2).toContain("Friendly reminder");
  console.log(dialogMessage2);

  await Button_ok.click();
});

test("wait for response", async ({ page }) => {
  const nav_menu = page.locator("nb-menu").getByText("Modal & Overlays");
  await nav_menu.click();
  await page.getByRole("link", { name: "Dialog" }).click();
  await page.getByText("Open with delay 3 seconds").click();

  const dialog_container = page.locator("nb-dialog-container");
  const Button_ok = dialog_container.getByRole("button", { name: "OK" });

  //it will wait for for button on dialog /alert
  //await Button_ok.click()

  //it will not wait for text on dialog
  //const dialogMessage = await dialog_container.locator('nb-card-header').textContent()
  //expect(dialogMessage).toEqual('Friendly reminder')

  //or  - below lines will failed as it cannot wait for specfic element , then we need to use custom waits for elements
  // const dialogMessage1 = await dialog_container.locator('nb-card-header').allTextContents()
  // expect(dialogMessage1).toContain('Friendly reminder')

  // another wait for api response
  //await page.waitForSelector("nb-dialog-container");
  await page.waitForResponse("**/delay/*");

  const dialogMessage2 = await dialog_container
    .locator("nb-card-header")
    .allTextContents();
  expect(dialogMessage2).toContain("Friendly reminder");
  console.log(dialogMessage2);

  await Button_ok.click();
});

test("wait for load state", async ({ page }) => {
  const nav_menu = page.locator("nb-menu").getByText("Modal & Overlays");
  await nav_menu.click();
  await page.getByRole("link", { name: "Dialog" }).click();
  await page.getByText("Open with delay 3 seconds").click();

  const dialog_container = page.locator("nb-dialog-container");
  const Button_ok = dialog_container.getByRole("button", { name: "OK" });

  //it will wait for for button on dialog /alert
  //await Button_ok.click()

  //it will not wait for text on dialog
  //const dialogMessage = await dialog_container.locator('nb-card-header').textContent()
  //expect(dialogMessage).toEqual('Friendly reminder')

  //or  - below lines will failed as it cannot wait for specfic element , then we need to use custom waits for elements
  // const dialogMessage1 = await dialog_container.locator('nb-card-header').allTextContents()
  // expect(dialogMessage1).toContain('Friendly reminder')

  // another wait for api response
  //await page.waitForSelector("nb-dialog-container");
  //await page.waitForResponse('**/delay/*')


  // not recodemded 
  await page.waitForLoadState("networkidle");

  const dialogMessage2 = await dialog_container
    .locator("nb-card-header")
    .allTextContents();
  expect(dialogMessage2).toContain("Friendly reminder");
  console.log(dialogMessage2);

  await Button_ok.click();
});

test("wait for timeout", async ({ page }) => {
  const nav_menu = page.locator("nb-menu").getByText("Modal & Overlays");
  await nav_menu.click();
  await page.getByRole("link", { name: "Dialog" }).click();
  await page.getByText("Open with delay 3 seconds").click();

  const dialog_container = page.locator("nb-dialog-container");
  const Button_ok = dialog_container.getByRole("button", { name: "OK" });

  //it will wait for for button on dialog /alert
  //await Button_ok.click()

  //it will not wait for text on dialog
  //const dialogMessage = await dialog_container.locator('nb-card-header').textContent()
  //expect(dialogMessage).toEqual('Friendly reminder')

  //or  - below lines will failed as it cannot wait for specfic element , then we need to use custom waits for elements
  // const dialogMessage1 = await dialog_container.locator('nb-card-header').allTextContents()
  // expect(dialogMessage1).toContain('Friendly reminder')

  // another wait for api response
  //await page.waitForSelector("nb-dialog-container");
  //await page.waitForResponse('**/delay/*')


  // not recodemded  as it was harded coded
  await page.waitForTimeout(9000);

  const dialogMessage2 = await dialog_container
    .locator("nb-card-header")
    .allTextContents();
  expect(dialogMessage2).toContain("Friendly reminder");
  console.log(dialogMessage2);

  await Button_ok.click();
});


