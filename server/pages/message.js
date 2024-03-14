const { createBrowser } = require("./utils/Browser");

const { GROUP, USER, PASSWORD } = require('../../config.json');

module.exports = async function (req, res) {
  let browser;
  try {
    browser = await createBrowser();
    await browser.open(GROUP);
    await browser.page.click('[aria-label="Sign in"]');
    await delay(300);
    await browser.page.type('[type="email"]', USER);
    await clickButtonWithLabel(browser, 'Next');
    await browser.page.type('[type="password"]', PASSWORD);
    await clickButtonWithLabel(browser, 'Next');
    await browser.snapshot();
    await browser.close();
  } catch (e) {
    console.error(e);
    await browser.snapshot();
    await browser.close();
    res.status(500);
    res.json({ error: e.message });
    return;
  }
  res.json({ ok: true });
}

async function clickButtonWithLabel(browser, label) {
  let nextButton = await browser.page.$x('//button[contains(string(), "Next")]')
  if (nextButton.length === 0) {
    throw new Error(`Button with label ${label} not found`);
  }
  await nextButton[0].click();
}
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}