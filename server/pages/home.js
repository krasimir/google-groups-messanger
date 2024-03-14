const version = require('../../package.json').version;

module.exports = function (req, res) {
  res.set('Content-Type', 'text/html');
  res.send(`
    <!doctype html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <h1>VarnaLab</h1>
      <div><small>Version: ${version}</small></div>
    </body>
    </html>
  `);
}