import { CONSTANTS } from 'cypress/fixtures/constants';

describe('проверяем доступность приложения', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('/');
    cy.wait('@getIngredients');
  });
  it('Получаем ингредиенты', () => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.wait('@getIngredients');
  });

  it('Добавление ингредиентов в конструктор', () => {
    cy.get(`[data-cy=${CONSTANTS.BUN_ID}] button`).click();
    cy.get(`[data-cy=${CONSTANTS.INGREDIENT_ID_1}] button`).click();
  });

  it('Работа модального окна', () => {
    cy.get(`[data-cy=${CONSTANTS.BUN_ID}] a`)
      .contains(`${CONSTANTS.BUN_NAME}`)
      .click();
    cy.get(`[data-cy=modal]`)
      .should('be.visible')
      .contains(`${CONSTANTS.BUN_NAME}`);
    cy.get(`[data-cy='modal'] button`).click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'getUser.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'createOrder.json' }).as(
      'createOrder'
    );
    cy.fixture('token.json').then((tokens) => {
      cy.setCookie('accessToken', tokens.accessToken);
      cy.setCookie('refreshToken', tokens.refreshToken);
    });
    cy.visit('/');
  });

  it('«Оформить заказ»', () => {
    cy.get(`[data-cy=${CONSTANTS.BUN_ID}] button`).click();
    cy.get('[data-cy=bun-top]').contains(`${CONSTANTS.BUN_NAME}`);
    cy.get('[data-cy=bun-bottom]').contains(`${CONSTANTS.BUN_NAME}`);
    cy.get(`[data-cy=${CONSTANTS.INGREDIENT_ID_1}] button`).click();
    cy.get(`[data-cy='listIngredients']`).find(
      `[data-cy=${CONSTANTS.INGREDIENT_ID_1}]`
    );
    cy.get(`[data-cy=${CONSTANTS.INGREDIENT_ID_2}] button`).click();
    cy.get(`[data-cy='listIngredients']`).find(
      `[data-cy=${CONSTANTS.INGREDIENT_ID_2}]`
    );

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder').then((interception) => {
      expect(interception.request.headers.authorization).to.eq(
        'testAccessToken'
      );
    });
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get(`[data-cy=number]`).should('have.text', '92236');
    cy.get(`[data-cy=modal] button`).click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy="bun-top"]').should('not.exist');
    cy.contains('Выберите булки').should('be.visible');

    cy.get('[data-cy="bun-bottom"]').should('not.exist');
    cy.contains('Выберите булки').should('be.visible');

    cy.get(`[data-cy='listIngredients'] li`).should('not.exist');
  });
});
