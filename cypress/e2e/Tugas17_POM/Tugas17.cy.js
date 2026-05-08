import LoginPage from '../../support/pageObjects/LoginPage';
import loginData from '../../fixtures/loginData.json';

describe('OrangeHRM Login Feature with POM & Data-Driven', () => {

  beforeEach(() => {
    LoginPage.visit();
  });

  it('TC01 - Login dengan kredensial valid', () => {
    LoginPage.enterUsername(loginData.validUser.username);
    LoginPage.enterPassword(loginData.validUser.password);
    LoginPage.clickLogin();
    cy.url().should('include', '/dashboard');
    LoginPage.getDashboardBreadcrumb().should('contain', 'Dashboard');
  });

  it('TC02 - Username salah', () => {
    LoginPage.enterUsername(loginData.invalidUser.username);
    LoginPage.enterPassword(loginData.invalidUser.password);
    LoginPage.clickLogin();
    LoginPage.getAlertMessage().should('contain', 'Invalid credentials');
  });

  it('TC03 - Password salah', () => {
    LoginPage.enterUsername(loginData.invalidPass.username);
    LoginPage.enterPassword(loginData.invalidPass.password);
    LoginPage.clickLogin();
    LoginPage.getAlertMessage().should('contain', 'Invalid credentials');
  });

  it('TC04 - Username kosong', () => {
    LoginPage.enterPassword(loginData.emptyUser.password);
    LoginPage.clickLogin();
    LoginPage.getRequiredMessage().should('contain', 'Required');
  });

  it('TC05 - Password kosong', () => {
    LoginPage.enterUsername(loginData.emptyPass.username);
    LoginPage.clickLogin();
    LoginPage.getRequiredMessage().should('contain', 'Required');
  });

  it('TC06 - Navigasi ke halaman pemulihan password', () => {
    LoginPage.clickForgotPassword();
    cy.url().should('include', '/requestPasswordResetCode');
  });

  it('TC07 - Cek sensitivitas huruf pada kredensial', () => {
    LoginPage.enterUsername(loginData.caseSensitive.username);
    LoginPage.enterPassword(loginData.caseSensitive.password);
    LoginPage.clickLogin();
    cy.url().should('include', '/dashboard');
  });

  it('TC08 - Validasi refresh halaman terlogin', () => {
    LoginPage.enterUsername(loginData.validUser.username);
    LoginPage.enterPassword(loginData.validUser.password);
    LoginPage.clickLogin();
    cy.url().should('include', '/dashboard');
    cy.reload();
    cy.url().should('include', '/dashboard');
    LoginPage.getDashboardBreadcrumb().should('contain', 'Dashboard');
  });

  it('TC09 - Semua field kosong', () => {
    LoginPage.clickLogin();
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain', 'Required');
  });

  it('TC10 - Password dengan spasi', () => {
    LoginPage.enterUsername(loginData.spacePass.username);
    LoginPage.enterPassword(loginData.spacePass.password);
    LoginPage.clickLogin();
    LoginPage.getAlertMessage().should('contain', 'Invalid credentials');
  });

});
