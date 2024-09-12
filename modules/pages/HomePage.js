class HomePage {
    constructor(page){
        this.page=page;
        //Locators
        this.menuButton="//div[@class='bm-burger-button']//button[1]";
        this.logoutLink="#logout_sidebar_link";
        this.cartIcon= "//div[@id='shopping_cart_container']/a[1]";
    }

    async clickOnMenu(){
        await this.page.click(this.menuButton);
    }
    async clickOnLogout() {
        await this.page.click(this.logoutLink);
    }

    async Procucts () {
        await this.page.locator("//div[@class='inventory_item_name']");
    }

    async clickOnCartIcon() {
        await this.page.click(this.cartIcon);
    }
}
export default HomePage;