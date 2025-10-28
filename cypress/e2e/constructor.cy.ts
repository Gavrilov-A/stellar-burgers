describe('проверяем доступность приложения', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });
  it('Получаем ингредиенты', () => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('Добавление ингредиентов в конструктор', () => {
    const buttonBun = cy.get(`[data-cy='643d69a5c3f7b9001cfa093d'] button`);
    const buttonIngredient = cy.get(
      `[data-cy='643d69a5c3f7b9001cfa093e'] button`
    );
    buttonBun.click();
    buttonIngredient.click();
  });

  it('Работа модального окна', () => {
    const bun = cy.get(`[data-cy='643d69a5c3f7b9001cfa093d'] a`);
    bun.click();
    cy.get(`[data-cy='modal']`).should('be.visible');
    const buttonClose = cy.get(`[data-cy='modal'] button`);
    buttonClose.click();
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
    cy.visit('http://localhost:4000');
  });

  it('«Оформить заказ»', () => {
    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa093d'}] button`).click();
    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa093e'}] button`).click();
    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa0942'}] button`).click();
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder').then((interception) => {
      expect(interception.request.headers.authorization).to.eq(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWI5M2I1NjczMDg2MDAxYmE4ZGVhZCIsImlhdCI6MTc2MTQ3NjM5MSwiZXhwIjoxNzYxNDc3NTkxfQ.oSod_llMqBhJ1ohOY7D9PSaPxzcA8it99AzVj_Ae1YM'
      );
    });
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get(`[data-cy='number']`).should('have.text', '92236');
    cy.get(`[data-cy='modal'] button`).click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy="bun-top"]').should('not.exist');
    cy.contains('Выберите булки').should('be.visible');

    cy.get('[data-cy="bun-bottom"]').should('not.exist');
    cy.contains('Выберите булки').should('be.visible');

    cy.get(`[data-cy='listIngredients'] li`).should('not.exist');
  });
});
