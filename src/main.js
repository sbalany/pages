const puppeteer = require('puppeteer');
const login = require('./login');
const navigateAndScreenshot = require('./map');
const sendToTelegram = require('./telegram');
const fse = require('fs-extra');
const path = require('path');
require('dotenv').config();

(async () => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatIds = process.env.TELEGRAM_CHAT_IDS.split(',');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();

    // Set the viewport to the same size as the window
    await page.setViewport({ width: 1920, height: 1080 });


    try {
        await login(page, email, password);
        const screenshotPath = await navigateAndScreenshot(page);
        await sendToTelegram(screenshotPath, botToken, chatIds);
        fse.unlinkSync(screenshotPath);
        // await page.goto('https://www.example.com/logout');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
})();
