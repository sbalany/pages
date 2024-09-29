const puppeteer = require('puppeteer');

async function login(page, email, password) {
    await page.goto('https://convexvalue.com/member/');

    // Wait for the email input to be available in the DOM
    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', email);
    
    // Wait for the password input to be available in the DOM
    await page.waitForSelector('input[name="password"]');
    await page.type('input[name="password"]', password);
    
    // Wait for the submit button to be available in the DOM
    await page.waitForSelector('button[type="submit"].whitebtn');
    await page.click('button[type="submit"].whitebtn');

    await page.waitForNavigation();
}

module.exports = login;
