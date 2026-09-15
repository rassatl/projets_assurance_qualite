describe('Logout Tests', () => {

  // L'application déclenche un appel réseau qui est annulé par la navigation
  // provoquée par le logout, ce qui lève une exception non gérée côté page.
  // Cette erreur est propre à l'app et n'affecte pas la vérification du scénario.
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
  })

  // Scénario bonus 2 : vérification de la déconnexion
  it('logout redirects to the login page', () => {
    cy.login()

    cy.get('.oxd-userdropdown-tab').click()
    cy.get('.oxd-userdropdown-link').contains('Logout').click()

    cy.url().should('include', '/auth/login')
    cy.get('input[name="username"]').should('be.visible')
  })

})
