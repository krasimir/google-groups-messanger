const playwright = require("playwright");

async function createBrowser() {
  const browser = await playwright['firefox'].launch()
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 }
  });
  const page = await context.newPage();
  const api = {
    page,
    open(url) {
      console.log(`Opening page ${url}`);
      return page.goto(url);
    },
    async snapshot() {
      await page.screenshot({ path: __dirname + '/../../public/page.png' });
    },
    async close() {
      await browser.close();
    }
  }

  return api;
}

module.exports = {
  createBrowser
}