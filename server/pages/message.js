const { createBrowser } = require("./utils/Browser");

const { GROUP, USER, PASSWORD } = require('../../config.json');

module.exports = async function (req, res) {
  let browser;
  try {
    browser = await createBrowser();
    await browser.open(GROUP);
    await browser.snapshot();
    await browser.close();
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: e.message });
    browser.close();
    return;
  }
  res.json({ ok: true });
}