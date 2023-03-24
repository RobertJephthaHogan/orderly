const {By, Key, Builder} = require("selenium-webdriver")
require("chromedriver")


async function test_login() {
    
    // create the driver
    let driver = await new Builder().forBrowser("chrome").build();

    // send driver to website
    await driver.get("http://localhost:3002");

    //await driver.findElement(By.className("intro-mini-font")).sendKeys("Hello,workd!", Key.RETURN);

    // click on the login button
    hompageLoginBtn = await driver.findElement(By.id("login-btn"));
    await hompageLoginBtn.click()

    usernameField = await driver.findElement(By.id("username-input"))
    await usernameField.sendKeys("robertjephthahogan@gmail.com");

    passwordField = await driver.findElement(By.id("password-input"))
    await passwordField.sendKeys("admin123");

    submitLoginBtn = await driver.findElement(By.id("submit-login"));
    await submitLoginBtn.click();

    // setInterval(async function(){
    //     console.log('driver.getCurrentUrl();', await driver.getCurrentUrl())
    // }, 100);

    
    // welcomeBackTitle = await driver.findElement(By.id("welcome-back-title"));
    // console.log(await welcomeBackTitle.getText());

    setInterval(function(){
        driver.quit;
    }, 10000);

}

test_login();