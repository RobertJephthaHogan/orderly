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

    setTimeout(async function(){
        welcomeBackTitle = await driver.findElement(By.id("welcome-back-title"));
        text = await welcomeBackTitle.getText()
        console.log(text);
        if (text === 'Welcome back, Robert!'){
            return true
        }
        return false
        
    }, 1000);

    


    setInterval(function(){
        driver.quit;
    }, 10000);

}

success = 0
fail = 0

result = test_login();

console.log('test results: ', result)

if (result == true) {
    success += 1
} else if (result == false) {
    fail += 1
}

results = {
    success: success,
    fail: fail
}

console.log('test results: ', results)