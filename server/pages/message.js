// const { createBrowser } = require("./utils/Browser.puppeteer");
const { createBrowser } = require("./utils/Browser.playwright");

const { GROUP, USER, PASSWORD } = require('../../config.json');

module.exports = async function (req, res) {
  let browser;
  try {
    browser = await createBrowser();
    await browser.open(GROUP);
    await postMessage(
      browser,
      `Test`,
      `Text`
    );
    await browser.snapshot();
    await browser.close();
  } catch(err) {
    console.error(err);
    await browser.snapshot();
    await browser.close();
    res.status(500);
    res.json({ error: err.message });
    return;
  }
  res.json({ ok: true });
}

async function postMessage(browser, subject, text) {
  console.log('Opened the page');
  await browser.page.click('[aria-label="Sign in"]');
  console.log('Clicked the sign in button');
  await browser.page.waitForSelector('[type="email"]');
  await browser.page.type('[type="email"]', USER);
  console.log('Typed the email');
  await clickButtonWithLabel(browser, 'Next');
  await browser.page.waitForSelector('[aria-label="Enter your password"]', { timeout: 4000});
  await browser.page.type('[aria-label="Enter your password"]', PASSWORD);
  console.log('Typed the password');
  await clickButtonWithLabel(browser, 'Next');
  await browser.page.waitForSelector('[aria-label*="Профил в Google"]', { timeout: 4000 });
  await browser.open(GROUP);
  await clickButtonWithLabel(browser, 'Нов разговор');
  await browser.page.waitForSelector('[aria-label="Тема"]');
  console.log('Clicked the new conversation button');
  await browser.page.type('[aria-label="Тема"]', subject);
  await browser.page.type('[aria-label="Създаване на съобщение"]', text);
  await browser.page.locator('[aria-label="Публикуване на съобщението"]').first().click();
  console.log('Posted the message');
  await delay(2000);
}
async function clickButtonWithLabel(browser, label) {
  await browser.page.locator(`//button[contains(string(), "${label}")]`).first().click();
}
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}