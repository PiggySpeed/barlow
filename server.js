const https = require('https');
const http = require('http');
const processHtml = require('./src/processor');
const schools = require('./src/config/schools');

function serveHTML(data) {

  // build html
  const header = `<meta charset="utf-8">`;

  const body = data.reduce((acc, curr) => {
    let elem = acc + `<p><span>${curr.name}</span>`;
    for (let url of curr.urls) {
      elem += ` <a href=${curr.url}>${url}</a></p>`;
    }
    return elem;
  }, '');

  const html = '<!DOCTYPE html>'
    + '<html><header>' + header + '</header><body>' + body + '</body></html>';

  // set up server
  http.createServer(function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(html);
  }).listen('8080');

}

function main() {
  const school = 'cmu';

  try {
    https.get(schools[school], function(res) {
      console.log(res.statusCode);
      res.setEncoding('utf8');

      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        processHtml(rawData, school, serveHTML);
      })

    });
  } catch (err) {
    console.log(err);
  }
}

main();
