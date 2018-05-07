const parse5 = require('parse5');
const { findNodes } = require('../utils/parser_helpers');

async function parseStanford() {
  const html = parse5.parse(this.raw);
  const tables = findNodes(html, 'tbody');
  // Stanford has multiple tables of faculty members on the same page
  let tableRows = [];
  for (let table of tables) {
    const rows = findNodes(table, 'tr');
    rows.shift(); // remove the header row
    tableRows = tableRows.concat(rows);
  }

  const sites = [];
  for (let row of tableRows) {
    const node = findNodes(row, 'a')[0];

    if (!node) {
      continue;
    }

    const link = node.attrs[0].value.toString().trim();
    const name = node.childNodes[0].value.toString().trim().replace(/(\w+)\s+(\w+)/, "$2, $1");
    // Stanford only has one website per faculty member
    sites.push({ name, urls: [link] });
  }

  this.result = sites;
}

module.exports = parseStanford;
