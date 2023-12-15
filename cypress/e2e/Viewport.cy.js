describe('Viewport', () => {
  before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('viewport-testing', () => {
    cy.visit('http://localhost:5173/about/');
    cy.viewport(1200, 1000);
  });

  after(() => {
    Cypress.off('uncaught:exception');
  });
});
