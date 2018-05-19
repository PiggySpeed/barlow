const parse5 = require('parse5');
const schools = require('../config/schools');
const { findNodes } = require('../utils/parser_helpers');

function hasLinks(elem) {
  return elem && elem.childNodes.length > 0;
}

function areWebsites(elem) {
  return elem.childNodes[0].value.toString().match(/(Website)/);
}

function extractAndFixURL(elem) {
  // assumes elem is a valid website anchor node
  const root = schools.upenn.protocol + '//' + schools.upenn.host;
  let url = elem.attrs[0].value.toString().trim();

  if (url.substring(0, 3) === '../') {
    url = url.replace('..', root);
  }

  return url;
}

async function parseUPenn() {
  const html = parse5.parse(this.raw);
  const table = findNodes(html, 'tbody');
  let rows = findNodes(table[0], 'tr');

  rows = rows.filter((elem) => {
    return elem.childNodes.length === 5;
  });

  let profiles = [];
  for (let row of rows) {
    const nodes = row.childNodes[3].childNodes;
    let name;

    // find name
    if (nodes[0].tagName === 'p') {
      // some names are nested in p tags (e.g. Arvind Bhusnurmath)
      name = nodes[0].childNodes[1].value.toString().trim();
    } else {
      name = nodes[1].value.toString().trim();
    }

    // find urls
    let urls = findNodes(row, 'a');
    urls = urls
      .filter(hasLinks)
      .filter(areWebsites)
      .map(extractAndFixURL);

    profiles.push({ name, urls });
  }

  this.result = profiles;
}

module.exports = parseUPenn;
