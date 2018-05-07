const https = require('https');
const http = require('http');
const processHtml = require('./src/processor.js');

const httpOptions = {
  cmu: {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    protocol: 'https:',
    host: 'csd.cs.cmu.edu',
    path: '/directory/faculty'
  },
  harvard: {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    protocol: 'https:',
    host: 'www.seas.harvard.edu',
    path: '/computer-science/people'
  },
  stanford: {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    protocol: 'https:',
    host: 'cs.stanford.edu',
    path: '/directory/faculty'
  }
};

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
    console.log('listening at port 8080...');
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(html);
  }).listen('8080');

}

function main() {
  const school = 'stanford';

  try {
    https.get(httpOptions[school], function(res) {
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
