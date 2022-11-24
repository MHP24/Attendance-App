
describe('Register Page', () => {
  beforeEach(() => {
    cy.viewport(380, 710);
  });

  it('Should redirect to register and show form with inputs and redirect to login', () => {
    cy.visit('http://localhost:8100').then(() => {
      cy.get('#register').click();
      cy.get('#email').should('exist');
      cy.get('#username').should('exist');
      cy.get('#question').should('exist');
      cy.get('#answer').should('exist');
      cy.get('#password').should('exist');
      cy.visit('http://localhost:8100');
      cy.wait(2000);
    });
  });
});

describe('Login page', () => {
  beforeEach(() => {
    cy.viewport(380, 710);
  });

  it('Should load login page and show 3 account actions', () => {
    cy.visit('http://localhost:8100').then(() => {
      cy.get('#recover').should('exist');
      cy.get('#register').should('exist');
      cy.get('#password').should('exist');
    });
    cy.wait(2000);
  });

  it('Should verify correct inputs', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.get('#email').type('atorres@duocuc.cl');
      cy.get('#password').type('1234');
      cy.get('#invalid1').should('not.exist');
      cy.get('#invalid2').should('not.exist');
      cy.get('#invalid3').should('not.exist');
      cy.wait(2000);
    });
  });

  it('Should verify wrong mail format', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.get('#email').type('atorres');
      cy.get('#password').type('1234');
      cy.get('#invalid2').should('exist');
      cy.wait(2000);
    });
  });
});


describe('Routing control', () => {
  beforeEach(() => {
    cy.viewport(380, 710);
  });

  it('Should protect navigation routes and redirect to login', () => {
    cy.visit('http://localhost:8100/navigation/home').then(() => {
      cy.get('#recover').should('exist');
      cy.get('#register').should('exist');
      cy.get('#password').should('exist');
      cy.wait(2000);
    });
  });
});