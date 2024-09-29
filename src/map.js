const fse = require('fs-extra');
const path = require('path');

async function navigateAndScreenshot(page) {
    // const screenshotDir = path.join(process.env.HOME, 'tmp');
    const screenshotDir = path.join(__dirname, '..', 'tmp');
    const screenshotPath = path.join(screenshotDir, 'screenshot.png');

    // Check if the directory exists, if not, create it
    if (!fse.existsSync(screenshotDir)) {
        fse.mkdirSync(screenshotDir, { recursive: true });
    }

    await page.goto('https://convexvalue.com/go/map/?q=map', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: screenshotPath });
    return screenshotPath;
}

module.exports = navigateAndScreenshot;
