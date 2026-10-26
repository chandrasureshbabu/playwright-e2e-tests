import { test, expect } from "@playwright/test";
import { includes } from "zod";

test.describe("form layout page", () => {
  test.beforeEach(
    "Test site launcher for auto wait concept",
    async ({ page }, testinfo) => {
      // Navigate to Datepicker page
      await page.goto(
        "https://playground.bondaracademy.com/pages/forms/layouts",
      );

      // ✅ Verify page loaded successfully
      await expect(page).toHaveURL(
        "https://playground.bondaracademy.com/pages/forms/layouts",
      );

      // ✅ Verify URL contains '/forms'
      await expect(page).toHaveURL(/.*\/forms/);

      // Increase timeout by 5 seconds for all tests in this suite
      testinfo.setTimeout(testinfo.timeout + 5000);
    },
  );

  test("Sliders", async ({ page }) => {
    await page.getByText("IoT Dashboard").click();
    //1 setting the attribute value
    await page.waitForTimeout(5000); // waits for 3 seconds
    const tempcircle = page.locator(
      '[tabtitle="Temperature"] ngx-temperature-dragger circle',
    );
    await tempcircle.evaluate((element) => {
      element.setAttribute("cx", "226.571");
      element.setAttribute("cy", "226.571");
    });
    await tempcircle.click();
  });

  test("sliders moving by mouse", async ({ page }) => {
    await page.getByText("IoT Dashboard").click();
    //1 setting the attribute value
    await page.waitForTimeout(5000); // waits for 3 seconds
    const tempbox = page.locator(
      '[tabtitle="Temperature"] ngx-temperature-dragger',
    );

    const box  = await tempbox.boundingBox();
    const x = box?.x + box?.width/2;
    const y = box?.y + box?.height/2;

    await page.mouse.move(x,y)
    await page.mouse.down();
    await page.mouse.up();
    console.log(tempbox.textContent())


  });

 test("sliders moving by mouse1", async ({ page }) => {
  // Navigate to IoT Dashboard where the circular temperature slider exists
  await page.getByText("IoT Dashboard").click();

  // Temporary wait for dashboard widgets to load
  // Prefer locator assertions over hard waits in real projects
  await page.waitForTimeout(5000);

  // Locate the Temperature slider component
  const tempbox = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger',
  );

  // Get the element's position and dimensions on the page
  // Returns:
  // {
  //   x: number,
  //   y: number,
  //   width: number,
  //   height: number
  // }
  const box = await tempbox.boundingBox();

  // Calculate center coordinates of the slider
  // Most circular sliders are dragged starting from the center
  const x = box?.x + box?.width / 2;
  const y = box?.y + box?.height / 2;

  // Move mouse cursor to center of slider
  await page.mouse.move(x, y);

  // Press and hold left mouse button
  // Equivalent to user grabbing the slider handle
  await page.mouse.down();

  // Drag slider horizontally towards right
  // Increasing X coordinate increases temperature value
  await page.mouse.move(x + 100, y);

  // Continue dragging diagonally downward
  // Circular sliders often require movement across an arc
  // rather than a simple straight line
  await page.mouse.move(x + 100, y + 100);

  // Release mouse button to complete drag operation
  await page.mouse.up();

  // Validate final temperature displayed in widget
  // Auto-waits until text contains "30"
  //Modal & Overlays
});
});
