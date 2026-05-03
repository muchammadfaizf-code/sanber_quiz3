describe('OrangeHRM Login Feature', () => {
  
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC01 - Login dengan kredensial valid', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('TC02 - Username salah', () => {
    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC03 - Password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongPass');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC04 - Username kosong', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group > .oxd-text').should('contain', 'Required');
  });

  it('TC05 - Password kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group > .oxd-text').should('contain', 'Required');
  });

  it('TC06 - Navigasi ke halaman pemulihan password', () => {
  cy.get('.orangehrm-login-forgot > .oxd-text').click();
  cy.url().should('include', '/requestPasswordResetCode');
  });

  it('TC07 - Cek sensitivitas huruf pada kredensial', () => {
    cy.get('input[name="username"]').type('ADMIN');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('TC08 - Validasi refresh halaman terlogin', () => {
  // Login dengan kredensial valid
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');

  // Refresh halaman
  cy.reload();

  // Pastikan user tetap berada di dashboard setelah refresh
  cy.url().should('include', '/dashboard');
  cy.get('.oxd-topbar-header-breadcrumb').should('contain', 'Dashboard');
});

  it('TC09 - Semua field kosong', () => {
    cy.get('button[type="submit"]').click();
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain', 'Required');
  });




  it('TC10 - Password dengan spasi', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('   admin123   ');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

});
