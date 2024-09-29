const fetch = require('node-fetch');
const fse = require('fs-extra');

const { Telegraf } = require('telegraf');

async function sendToTelegram(filePath, botToken, chatIds) {
    const bot = new Telegraf(botToken);
    for (const chatId of chatIds) {
      const fileStream = fse.createReadStream(filePath);
      await bot.telegram.sendPhoto(chatId, { source:fileStream });
    }
}

module.exports = sendToTelegram;
