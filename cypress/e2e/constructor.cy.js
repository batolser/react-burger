
describe('app works correctly with routes', function() {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
  });
    it('Should open constructor page by default', function() {
      cy.contains('Соберите бургер');
    });
  
    it('Should open and close modal', () => {
      cy.get('a').contains('Краторная булка N-200i').click();
      cy.get('h4').contains('Краторная булка N-200i').should('exist');
      cy.get('div').find('[test-id="close-modal"]').click();
     
   });
   it('Should do order', () => {
    cy.get('p').contains('Личный кабинет').click();
    cy.get('[name="email"]').type('batolser01@ya.ru');
    cy.get('[name="password"]').type('120865');
    cy.get('button').contains('Войти').click();
    cy.get('[test-id="constructor"]').as('constructor');
    cy.get('a').contains('Краторная булка N-200i').trigger("dragstart").trigger("dragleave");
    cy.get("@constructor").trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
    cy.get('@constructor').find('button').contains('Оформить заказ').click();
    cy.wait(16000).get('h4').contains('идентификатор заказа');
    cy.get('div').find('[test-id="close-modal"]').click();
 });

  }); 