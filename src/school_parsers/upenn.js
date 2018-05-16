const parse5 = require('parse5');
const schools = require('../config/schools');
const { findNodes } = require('../utils/parser_helpers');
const { throttleRequests } = require('../utils/request_helpers');

function areWebsites(elem) {
  return 'Website' === elem[0].childNodes[0].value.toString().trim();
}

async function parseUPenn() {
  const html = parse5.parse(this.raw);
  const root = schools.upenn.protocol + '//' + schools.upenn.host;
  const table = findNodes(html, 'tbody');
  const links = findNodes(table[0], 'a', {'class': 'media-heading'});
  const test = links.filter(areWebsites).slice(0, 5);
  console.log('start', this.raw);
  console.log(test);
  return;

  // TODO: fix upenn
  
  // this.result = sites;
}

module.exports = parseUPenn;
