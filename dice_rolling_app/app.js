const HTTP = require('http');
const URL = require('url').URL;
const PORT = 3000;

function getParams(path) {
  const myURL = new URL(path, `http://localhost:${PORT}`);
  return myURL.searchParams;
}

function dieRoll(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function rollDice(path) {
  let numDice = Number(getParams(path).get('rolls'));
  let sides = Number(getParams(path).get('sides'));
  let body = '';
  for (let count = 0; count < numDice; count++) {
    body += dieRoll(1, sides) + '\n';
  }
  return body;
}

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;

  if (path === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(`${rollDice(path)}\n`);
    res.write(`${method} ${path}\n`);
    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});