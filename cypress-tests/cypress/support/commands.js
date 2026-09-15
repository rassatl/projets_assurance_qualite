const ADMIN_USERNAME = 'Admin'
const ADMIN_PASSWORD = 'admin123'

Cypress.Commands.add('login', (username = ADMIN_USERNAME, password = ADMIN_PASSWORD) => {
  cy.visit('/web/index.php/auth/login')
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should('include', '/dashboard')
})
