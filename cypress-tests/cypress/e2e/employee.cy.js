import { faker } from '@faker-js/faker'

describe('Employee Tests', () => {

  beforeEach(() => {
    cy.login()
  })

  // Le champ "Employee Id" est pré-rempli par l'application avec le prochain id
  // disponible ; en environnement de test parallèle, deux tests peuvent recevoir
  // la même valeur suggérée. On force un id unique pour éviter les collisions.
  function fillUniqueEmployeeId() {
    cy.contains('.oxd-input-group', 'Employee Id')
      .find('input')
      .clear()
      .type(faker.string.numeric(6))
  }

  it('add new employee', () => {
    const firstName = 'John'
    const lastName = 'Doe'

    cy.contains('.oxd-main-menu-item', 'PIM').click()
    cy.contains('button', 'Add').click()

    cy.get('input[name="firstName"]').type(firstName)
    cy.get('input[name="lastName"]').type(lastName)
    fillUniqueEmployeeId()
    cy.contains('button', 'Save').click()

    cy.url({ timeout: 15000 }).should('include', 'viewPersonalDetails')
    cy.get('input[name="firstName"]').should('have.value', firstName)
    cy.get('input[name="lastName"]').should('have.value', lastName)
  })

  // Scénario bonus 1 : ajout d'un employé avec des données générées dynamiquement via Faker.js
  it('add new employee with dynamic data', () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    cy.contains('.oxd-main-menu-item', 'PIM').click()
    cy.contains('button', 'Add').click()

    cy.get('input[name="firstName"]').type(firstName)
    cy.get('input[name="lastName"]').type(lastName)
    fillUniqueEmployeeId()
    cy.contains('button', 'Save').click()

    cy.url({ timeout: 15000 }).should('include', 'viewPersonalDetails')
    cy.get('input[name="firstName"]').should('have.value', firstName)
    cy.get('input[name="lastName"]').should('have.value', lastName)
  })

})
