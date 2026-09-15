const ADMIN_USERNAME = 'Admin';
const ADMIN_PASSWORD = 'admin123';

async function login(page, username = ADMIN_USERNAME, password = ADMIN_PASSWORD) {
  await page.goto('auth/login');
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(/dashboard/);
}

module.exports = { login, ADMIN_USERNAME, ADMIN_PASSWORD };
