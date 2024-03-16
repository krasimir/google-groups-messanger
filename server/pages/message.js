const { createBrowser } = require("./utils/Browser.playwright");

const { GROUP, USER, PASSWORD } = require('../../config.json');

module.exports = async function (req, res) {
  let browser;
  const subject = req.body.subject || 'Hey';
  const message = req.body.message || 'Hello, world!';

  // await delay(4000);
  // res.status(500);
  // res.json({ ok: true });return;

  try {
    browser = await createBrowser();
    await browser.open(GROUP);
    await postMessage(browser, subject, message);
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
  await browser.page.waitForSelector('[aria-label*="Google Account"]', { timeout: 4000 });
  await browser.open(GROUP);
  await clickButtonWithLabel(browser, 'New conversation');
  await browser.page.waitForSelector('[aria-label="Subject"]');
  console.log('Clicked the new conversation button');
  await browser.page.type('[aria-label="Subject"]', subject);
  await browser.page.type('[aria-label="Compose a message"]', text);
  await browser.page.locator('[aria-label="Post message"]').first().click();
  console.log('Posted the message');
  await delay(2000);
}
async function clickButtonWithLabel(browser, label) {
  await browser.page.locator(`//button[contains(string(), "${label}")]`).first().click();
}
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}