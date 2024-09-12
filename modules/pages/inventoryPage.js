class InventoryPage {
    constructor(page) {
      this.page = page;
      this.productItems = "//div[@class='inventory_item_name']";
    }
  
    // Get the count of all product elements
    async getProductCount() {
      return await this.page.locator(this.productItems).count();
    }
  
    // Click on a product at a specific index
    async clickProductAtIndex(index) {
      // Use nth() instead of trying to construct XPath manually
      await this.page.locator(this.productItems).nth(index).click();
    }
  
    // Navigate to the inventory page
    async goto() {
      await this.page.goto("https://www.saucedemo.com/inventory.html");
    }
  }
  
  export default InventoryPage;
  