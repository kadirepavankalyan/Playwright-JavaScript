class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = "//button[@class='btn_primary btn_inventory']";
    this.backButton = "(//div[@class='inventory_details']//button)[1]";
    this.checkoutButton = "//a[@class='btn_action checkout_button']";
    this.firstname = "#first-name";
    this.lastname = "#last-name";
    this.postalcode = "#postal-code";
    this.continueButton = "//input[@value='CONTINUE']";
    this.finsihButton = "//a[normalize-space(text())='FINISH']";
    this.confirmFinsihMessage = "//h2[normalize-space(text())='THANK YOU FOR YOUR ORDER']";
  }

  // Method to add the product to the cart
  async addToCart() {
    await this.page.click(this.addToCartButton);
  }
  async clickOnBack(){
    await this.page.click(this.backButton);
  }

  async clickOnCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async addDetails(firstName, lastName, postalCode) {
    await this.page.fill(this.firstname, firstName);
    await this.page.fill(this.lastname, lastName);
    await this.page.fill(this.postalcode, postalCode);
    await this.page.click(this.continueButton);
  }

  async clickOnFinish() {
    await this.page.click(this.finsihButton);
  }

  async confirmationMessageOnFinishOrder() {
    return this.page.textContent(this.confirmFinsihMessage);
  }
}

export default ProductPage;
