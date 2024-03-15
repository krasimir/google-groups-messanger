const puppeteer = require('puppeteer');

const IS_IT_LOCAL = __dirname.startsWith('/Users/krasimir');

async function createBrowser() {
  const instance = await puppeteer.launch(Object.assign(
    {
      headless: 'new',
      args: ['--no-sandbox', '--disable-web-security', '--user-data-dir', '--allow-running-insecure-content'],
    },
    !IS_IT_LOCAL ? {
      executablePath: '/usr/bin/chromium-browser',
    } : {}
  ));

  const page = await instance.newPage();
  const api = {
    page,
    async screenshot(name) {
      await page.screenshot({ path: `tmp/${name}.png` });
    },
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