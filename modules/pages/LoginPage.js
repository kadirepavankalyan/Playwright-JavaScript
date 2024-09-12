class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = "#user-name";
    this.passwordInput = "#password";
    this.loginButton = "#login-button";
    this.errorMessage =
      "//h3[contains(.,'Epic sadface: Sorry, this user has been locked out.')]";
  }

  async goto() {
    try {
      await this.page.goto("https://www.saucedemo.com/v1/index.html");
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}
export default LoginPage;
