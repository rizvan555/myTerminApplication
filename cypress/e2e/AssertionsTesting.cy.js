describe('Assertion-testing', () => {
  before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });
  it('assertions', () => {
    cy.visit('http://localhost:5173/signIn/');
    cy.title().should('eq', 'Termin-App');

    cy.url().should('contain', 'http://localhost:5173/signIn/');

    cy.get('#email-input').should('be.visible');
    cy.get('#email-input').should('be.visible').and('contain', '');
    cy.get('#email-input').should('have.length', '1');

    cy.get('#password-input').should('be.visible');
    cy.get('#login-button').should('be.visible');

    cy.get('#email-input').type('karimovrizvan84@gmail.com');
    cy.get('#password-input').type('123456');
    cy.get('#login-button').click();
    cy.url().should('eq', 'http://localhost:5173/dashboard/admin');
  });

  after(() => {
    Cypress.off('uncaught:exception');
  });
});
