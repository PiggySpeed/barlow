const parse5 = require('parse5');
const schools = require('../config/schools');
const { findNodes } = require('../utils/parser_helpers');
const { throttleRequests } = require('../utils/request_helpers');

async function parseBerkeley() {
  const html = parse5.parse(this.raw);
  const root = schools.berkeley.protocol + '//' + schools.berkeley.host;
  const container = findNodes(html, 'div', { id: 'block-system-main'});
  const rows = findNodes(container[0], 'h3', {'class': 'media-heading'});

  let paths = [];
  for (let row of rows) {
    let link = findNodes(row, 'a')[0].attrs[0].value.toString().trim();
    link = link.split(root).join('');
    paths.push(link);
    console.log(link);
  }

  const sites = [];
  const profiles = await throttleRequests(paths, { headers, protocol, host } = schools.berkeley);
  for (let profile of profiles) {
    const root = parse5.parse(profile);
    const container = findNodes(root, 'section', { 'class': 'links' });
    const websites = findNodes(container[0], 'a');

    if (websites.length > 0) {
      // find name
      let name = findNodes(root, 'h1', { 'class': 'fn' })[0].childNodes[0].value.toString().trim();
      name = name.replace(/(\w+)\s+(\w+)/, '$2, $1');

      // collect urls
      const urls = [];
      for (let website of websites) {
        const url = website.attrs[0].value.toString().trim();
        urls.push(url);
      }
      sites.push({ name, urls });
    }
  }

  this.result = sites;
}

module.exports = parseBerkeley;
