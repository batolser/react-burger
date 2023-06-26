const testUrl = 'http://localhost:3000'
const testIngredient = 'Краторная булка N-200i'

describe('app works correctly with routes', function() {
  var DataTransfer: new () => DataTransfer
    beforeEach(() => {
        // @ts-ignore
      cy.visit(testUrl);
  });
    it('Should open constructor page by default', function() {
        // @ts-ignore
      cy.contains('Соберите бургер');
    });
  
    it('Should open and close modal', () => {
        // @ts-ignore
      cy.get('a').contains(testIngredient).click();
        // @ts-ignore
      cy.get('h4').contains(testIngredient).should('exist');
        // @ts-ignore
      cy.get('div').find('[test-id="close-modal"]').click();
     
   });
   it('Should do order', () => {
      // @ts-ignore
    cy.get('[test-id="constructor"]').as('constructor');
      // @ts-ignore
    cy.get('a').contains(testIngredient).trigger('dragstart', { DataTransfer });
    
    
  // @ts-ignore
    cy.get("@constructor").trigger('drop', { DataTransfer });
  // @ts-ignore
    cy.get('a').contains(testIngredient).trigger('dragend'); 
    // cy.get('a').contains(testIngredient).trigger("dragstart").trigger("dragleave");
    // cy.get("@constructor").trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
    // @ts-ignore
    cy.get('@constructor').find('button').contains('Оформить заказ').click();
    // @ts-ignore
    cy.get('[name="email"]').type('batolser01@ya.ru');
    // @ts-ignore
    cy.get('[name="password"]').type('120865');
    // @ts-ignore
    cy.get('button').contains('Войти').click();
    // @ts-ignore
    cy.get('@constructor').find('button').contains('Оформить заказ').click();
    // @ts-ignore
    cy.wait(16000).get('h4').contains('идентификатор заказа');
    // @ts-ignore
    cy.get('div').find('[test-id="close-modal"]').click();
 });

  }); 