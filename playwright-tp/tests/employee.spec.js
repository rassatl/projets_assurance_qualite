const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { login } = require('./utils/auth');

test.beforeEach(async ({ page }) => {
  await login(page);
});

// Le champ "Employee Id" est pré-rempli par l'application avec le prochain id
// disponible ; en environnement de test parallèle, deux tests peuvent recevoir
// la même valeur suggérée. On force un id unique pour éviter les collisions.
async function fillUniqueEmployeeId(page) {
  const employeeIdInput = page.locator('.oxd-input-group', { hasText: 'Employee Id' }).locator('input');
  await employeeIdInput.fill(faker.string.numeric(6));
}

test('add new employee', async ({ page }) => {
  const firstName = 'John';
  const lastName = 'Doe';

  await page.locator('.oxd-main-menu-item', { hasText: 'PIM' }).click();
  await page.getByRole('button', { name: 'Add' }).click();

  await page.locator('input[name="firstName"]').fill(firstName);
  await page.locator('input[name="lastName"]').fill(lastName);
  await fillUniqueEmployeeId(page);
  await page.getByRole('button', { name: 'Save' }).click();

  await page.waitForURL(/viewPersonalDetails/, { timeout: 15000 });
  await expect(page.locator('input[name="firstName"]')).toHaveValue(firstName);
  await expect(page.locator('input[name="lastName"]')).toHaveValue(lastName);
});

// Scénario bonus 1 : ajout d'un employé avec des données générées dynamiquement via Faker.js
test('add new employee with dynamic data', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  await page.locator('.oxd-main-menu-item', { hasText: 'PIM' }).click();
  await page.getByRole('button', { name: 'Add' }).click();

  await page.locator('input[name="firstName"]').fill(firstName);
  await page.locator('input[name="lastName"]').fill(lastName);
  await fillUniqueEmployeeId(page);
  await page.getByRole('button', { name: 'Save' }).click();

  await page.waitForURL(/viewPersonalDetails/, { timeout: 15000 });
  await expect(page.locator('input[name="firstName"]')).toHaveValue(firstName);
  await expect(page.locator('input[name="lastName"]')).toHaveValue(lastName);
});
