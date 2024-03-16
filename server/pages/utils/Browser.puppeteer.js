const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin())

const IS_IT_LOCAL = __dirname.startsWith('/Users/krasimir');

async function createBrowser() {
  const instance = await puppeteer.launch(Object.assign(
    {
      headless: 'new',
      args: ['--no-sandbox', '--disable-web-security', '--allow-running-insecure-content'],
    },
    !IS_IT_LOCAL ? {
      executablePath: '/usr/bin/chromium-browser',
    } : {}
  ));

  const page = await instance.newPage();
  const api = {
    page,
    open(url) {
      console.log(`Opening page ${url}`);
      return page.goto(url);
    },
    async snapshot() {
      await page.screenshot({ path: 'tmp/page.png' });
    },
    async close() {
      await instance.close();
    }
  }
    
  await page.setViewport({ width: 1366, height: 768 });

  return api;
}

module.exports = {
  createBrowser
}