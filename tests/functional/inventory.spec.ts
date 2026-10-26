import { test, expect } from "@playwright/test";

/**
 * Scenario:
 * 1. Login as standard user
 * 2. Get a list of products with its price
 * 3. Assert that all products have non-zero dollar value
 */

test.describe("items in cart and cost of items", () => {
  // ✅ Runs before each test in this describe block
  test.beforeEach(
    "launch eacrt site and login before any test",
    async ({ page }) => {
      await page.goto("https://www.saucedemo.com/"); // Navigate to SauceDemo login page
      await page.locator('[data-test="username"]').fill("standard_user"); // Fill username
      await page.locator('[data-test="password"]').fill("secret_sauce"); // Fill password
      await page.locator('[data-test="login-button"]').click(); // Click login button

      // 🔒 Assertion: ensure login succeeded by checking URL contains /inventory
      await expect(page).toHaveURL(/.*\/inventory/);
    },
  );

  test("add items to cart and watch ttl cost of cart:", async ({ page }) => {
    let inventoryitems = page.locator(".inventory_item");
    await expect(inventoryitems).toHaveCount(6);
    // ✅ Assertion: confirm there are 6 products displayed

    // Count total products
    let ttl_products = await inventoryitems.count();

    let product = []; // Array placeholder (not used later, but declared)
    let product_price = []; // Stores all product prices

    // 🔄 Loop through each product
    for (let i = 0; i < ttl_products; i++) {
      let products = inventoryitems.nth(i); // Get the i-th product element

      // 📦 Extract product name
      let productname = await products
        .locator(".inventory_item_name")
        .innerText();

      // 💲 Extract product price text (e.g., "$29.99")
      let price = await products.locator(".inventory_item_price").innerText();

      console.log(`product :${productname} price:${price}`);

      // Push raw price string into array
      product_price.push(price);
    }

    console.log(product_price);

    // 🔧 Convert price strings → numbers (remove "$" and parse float)
    let prices = product_price.map((p) => parseFloat(p.replace("$", "")));
    console.log(prices);

    // 🚨 Filter invalid prices (<= 0)
    let invalidprices = prices.filter((p) => p <= 0);

    if (invalidprices.length > 0) {
      console.log(`ERROR INVALID PRICES :${invalidprices}`);
    } else {
      console.log(`all products are tagged with valid prices`);
    }

    // ✅ Final assertion: ensure no invalid prices exist
    expect(invalidprices).toHaveLength(0);
  });
});
