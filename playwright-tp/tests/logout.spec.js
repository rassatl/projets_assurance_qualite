const { test, expect } = require('@playwright/test');
const { login } = require('./utils/auth');

// Scénario bonus 2 : vérification de la déconnexion
test('logout redirects to the login page', async ({ page }) => {
  await login(page);

  await page.locator('.oxd-userdropdown-tab').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  await expect(page).toHaveURL(/auth\/login/);
  await expect(page.locator('input[name="username"]')).toBeVisible();
});
