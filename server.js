const https = require('https');
const http = require('http');
const processHtml = require('./src/processor.js');

function serveHTML(data) {

  // build html
  const header = `<meta charset="utf-8">`;

  const body = data.reduce((acc, curr) => {
    return acc + `<p><span>${curr.name}</span> <a href=${curr.url}>${curr.url}</a></p>`
  }, "");

  const html = '<!DOCTYPE html>'
    + '<html><header>' + header + '</header><body>' + body + '</body></html>';

  console.log('received data ', html);

  // set up server
  http.createServer(function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(html);
  }).listen("8080");

}

function main() {
  const headers = {
    'Content-Type': 'text/html; charset=utf-8'
  };

  const options = {
    headers: headers,
    protocol: 'https:',
    host: 'csd.cs.cmu.edu',
    path: '/directory/faculty'
  };

  try {
    https.get(options, function(res) {
      console.log(res.statusCode);
      res.setEncoding('utf8');

      let rawData = "";
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        processHtml(rawData, serveHTML);
      })

    });
  } catch (err) {
    console.log(err);
  }
}

main();
