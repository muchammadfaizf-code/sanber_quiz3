class LoginPage {
  usernameField = 'input[name="username"]';
  passwordField = 'input[name="password"]';
  loginButton = 'button[type="submit"]';
  alertMessage = '.oxd-alert-content-text';
  requiredMessage = '.oxd-input-group > .oxd-text';
  forgotPasswordLink = '.orangehrm-login-forgot > .oxd-text';
  dashboardBreadcrumb = '.oxd-topbar-header-breadcrumb';

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  enterUsername(username) {
    if (username) cy.get(this.usernameField).type(username);
  }

  enterPassword(password) {
    if (password) cy.get(this.passwordField).type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  clickForgotPassword() {
    cy.get(this.forgotPasswordLink).click();
  }

  getAlertMessage() {
    return cy.get(this.alertMessage);
  }

  getRequiredMessage() {
    return cy.get(this.requiredMessage);
  }

  getDashboardBreadcrumb() {
    return cy.get(this.dashboardBreadcrumb);
  }
}

export default new LoginPage();
