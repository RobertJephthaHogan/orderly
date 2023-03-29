const {By, Key, Builder} = require("selenium-webdriver")
require("chromedriver")


let testResults = []

// define function to wait one second (for pg to load)
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


async function test_login() {
    
    // create the driver
    let driver = await new Builder().forBrowser("chrome").build();

    // send driver to website
    await driver.get("http://localhost:3002");

    //await driver.findElement(By.className("intro-mini-font")).sendKeys("Hello,workd!", Key.RETURN);

    // click on the login button
    hompageLoginBtn = await driver.findElement(By.id("login-btn"));
    await hompageLoginBtn.click()

    // Fill username input
    usernameField = await driver.findElement(By.id("username-input"))
    await usernameField.sendKeys("robertjephthahogan@gmail.com");

    // Fill password input
    passwordField = await driver.findElement(By.id("password-input"))
    await passwordField.sendKeys("admin123");

    // click submit login button
    submitLoginBtn = await driver.findElement(By.id("submit-login"));
    await submitLoginBtn.click();

    async function test() {
        
        await delay(1000); // wait one second for page to load

        welcomeBackTitle = await driver.findElement(By.id("welcome-back-title"));
        text = await welcomeBackTitle.getText() // get text of div w id="welcome-back-title"
        console.log(text);

        if (text === 'Welcome back, Robert!'){ // Check if test matches expected result
            return {
                test: 'test_login',
                pass: true,
            }
        }
        return  {
            test: 'test_login',
            pass: false,
        }
        
    }

    let testVar = await test();

    driver.quit;

    return testVar
}

async function test_add_task() {
    let driver = await new Builder().forBrowser("chrome").build();

    // send driver to website
    await driver.get("http://localhost:3002");

    //await driver.findElement(By.className("intro-mini-font")).sendKeys("Hello,workd!", Key.RETURN);

    // click on the login button
    hompageLoginBtn = await driver.findElement(By.id("login-btn"));
    await hompageLoginBtn.click()

    // Fill username input
    usernameField = await driver.findElement(By.id("username-input"))
    await usernameField.sendKeys("robertjephthahogan@gmail.com");

    // Fill password input
    passwordField = await driver.findElement(By.id("password-input"))
    await passwordField.sendKeys("admin123");

    // click submit login button
    submitLoginBtn = await driver.findElement(By.id("submit-login"));
    await submitLoginBtn.click();



    async function test() {
        
        await delay(1000); // wait one second for page to load
        userTasksMenuItem = await driver.findElement(By.id("user-tasks-menu-item"));
        await userTasksMenuItem.click(); // click on "User Tasks" sidebar menu item
        strUrl = driver.getCurrentUrl(); //  check that we are at route /tasks
        console.log('strUrl', await strUrl)

        await delay(1000); // wait 1000ms for page to load

        taskTitleField = await driver.findElement(By.id("task-title-input"))
        await taskTitleField.sendKeys("automation Test Task"); // set task title

        taskDescriptionField = await driver.findElement(By.id("task-description-input"))
        await taskDescriptionField.sendKeys("automation Test Task"); // set task description

        taskCategorySelect = await driver.findElement(By.id("task-category-select")).click()
        taskPrioritySelectOption = await driver.findElement(By.id("general-task-category-option")).click() // select priority

        taskPrioritySelect = await driver.findElement(By.id("task-priority-select")).click() // dropdown priority menu
        taskPrioritySelectOption = await driver.findElement(By.id("medium-priority-option")).click() // select priority

        taskDueDatePicket = await driver.findElement(By.id("task-due-date-picker")).click() // click due date datepicker
        await delay(250); // let datepicker transition
        taskDueDay = await driver.findElement(By.xpath(`/html/body/div[2]/div/div/div/div/div[1]/div[1]/div[2]/table/tbody/tr[5]/td[4]/div`)).click() // select date
        await delay(250); // let datepicker transition
        taskAmPm = await driver.findElement(By.xpath(`/html/body/div[2]/div/div/div/div/div[1]/div[2]/div[2]/ul[1]/li[11]/div`)).click() // select an hour
        await delay(250); // let datepicker transition
        okSelect = await driver.findElement(By.xpath(`/html/body/div[2]/div/div/div/div/div[2]/ul/li[2]/button/span`)).click() // select ok on datepicker

        submitBtn = await driver.findElement(By.id("submit-tsk")) // submit button
        await submitBtn.click() // submit the task

        

    //     if (text === 'Welcome back, Robert!'){ // Check if test matches expected result
    //         return {
    //             test: 'test_add_task',
    //             pass: true,
    //         }
    //     }
    //     return  {
    //         test: 'test_add_task',
    //         pass: false,
    //     }
        
    // }
    }

    let testVar = await test();
    return testVar
}


resultOne = test_login();
resultTwo = test_add_task()

const allResults = [resultOne, resultTwo]

allResults?.forEach(r => {
    r?.then(function(res) {
        console.log('res', res) // "Some User token"
        testResults.push(res)
        console.log('testResults', testResults)
    })
})


