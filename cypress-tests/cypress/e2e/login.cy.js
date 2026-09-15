describe('Login Tests', () => {

  beforeEach(() => {
    cy.visit('/web/index.php/auth/login')
  })

  it('should login with valid credentials', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
    cy.get('.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard')
  })

  it('should show error with invalid credentials', () => {
    cy.get('input[name="username"]').type('WrongUser')
    cy.get('input[name="password"]').type('WrongPassword')
    cy.get('button[type="submit"]').click()

    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
    cy.url().should('include', '/auth/login')
  })

})
