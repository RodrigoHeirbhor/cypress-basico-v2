Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
  cy.get('#firstName').type('Rodrigo')
  cy.get('#lastName').type('Sá')
  cy.get('#email').type('rodrigoheirbhor@gmail.com')
  cy.get('#open-text-area').type('Teste')
  cy.contains('button', 'Enviar').click()
})