describe('OrangeHRM Login Feature Quiz 3 dengan Intercept (10 Test Case)', () => {
  
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC01 - Login valid (intercept dashboard)', () => {
    cy.intercept('GET', '**/dashboard/**').as('dashboard');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.wait('@dashboard').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/dashboard');
  });

  it('TC02 - Username salah (intercept auth validate)', () => {
    cy.intercept('POST', '**/auth/validate').as('authFail');
    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.wait('@authFail').its('response.statusCode').should('eq', 302);
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC03 - Password salah (intercept login)', () => {
    cy.intercept('POST', '**/auth/validate').as('loginFail');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongPass');
    cy.get('button[type="submit"]').click();
    cy.wait('@loginFail').its('response.statusCode').should('eq', 302);
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });



  it('TC04 - Navigasi ke halaman pemulihan password (intercept forgot password)', () => {
    cy.intercept('GET', '**/requestPasswordResetCode').as('forgotPage');
    cy.get('.orangehrm-login-forgot > .oxd-text').click();
    cy.wait('@forgotPage').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/requestPasswordResetCode');
  });

  it('TC05 - Sensitivitas huruf username (intercept dashboard)', () => {
    cy.intercept('GET', '**/dashboard/**').as('dashboardCase');
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('ADMIN');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.wait('@dashboardCase').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/dashboard');
  });

  it('TC06 - Refresh halaman setelah login (intercept reload dashboard)', () => {
    cy.intercept('GET', '**/dashboard/**').as('reloadDashboard');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.reload();
    cy.wait('@reloadDashboard').its('response.statusCode').should('eq', 200);
    cy.get('.oxd-topbar-header-breadcrumb').should('contain', 'Dashboard');
  });



  it('TC07 - Password dengan spasi (intercept login)', () => {
    cy.intercept('POST', '**/auth/validate').as('loginSpacePass');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('   admin123   ');
    cy.get('button[type="submit"]').click();
    cy.wait('@loginSpacePass').its('response.statusCode').should('eq', 302);
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

});
