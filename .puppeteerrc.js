const path = require('path');

const IS_IT_LOCAL = __dirname.startsWith('/Users/krasimir');

module.exports = Object.assign(
  {},
  IS_IT_LOCAL ? {} : {
    cacheDirectory: path.join(__dirname, '.cache', 'puppeteer'),
  }
);