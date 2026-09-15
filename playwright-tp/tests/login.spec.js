const { test, expect } = require('@playwright/test');
const { ADMIN_USERNAME, ADMIN_PASSWORD } = require('./utils/auth');

test('login with valid credentials', async ({ page }) => {
  await page.goto('auth/login');

  await page.locator('input[name="username"]').fill(ADMIN_USERNAME);
  await page.locator('input[name="password"]').fill(ADMIN_PASSWORD);
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('.oxd-topbar-header-breadcrumb-module')).toHaveText('Dashboard');
});

test('login with invalid credentials', async ({ page }) => {
  await page.goto('auth/login');

  await page.locator('input[name="username"]').fill('WrongUser');
  await page.locator('input[name="password"]').fill('WrongPassword');
  await page.locator('button[type="submit"]').click();

  await expect(page.locator('.oxd-alert-content-text')).toHaveText('Invalid credentials');
  await expect(page).toHaveURL(/auth\/login/);
});
