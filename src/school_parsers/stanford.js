const parse5 = require('parse5');
const { findNodes } = require('../utils/parser_helpers');
const { throttleRequests } = require('../utils/request_helpers');

async function parseStanford() {
  const harvard = parse5.parse(this.raw);
  const root = /(https:\/\/www\.seas\.harvard\.edu)/g;
  const tableRows = findNodes(harvard, "div", { "class": "views-field views-field-nothing-1"});

  let paths = [];
  for (let row of tableRows) {
    let link = findNodes(row, "a")[0].attrs[0].value.toString().trim();
    link = link.replace(root, "");
    paths.push(link);
    console.log(link);
  }

  const headers = {
    'Content-Type': 'text/html; charset=utf-8'
  };

  const baseOptions = {
    headers: headers,
    protocol: 'https:',
    host: 'www.seas.harvard.edu'
  };

  const sites = [];

  const profiles = await throttleRequests(paths, baseOptions);
  for (let profile of profiles) {
    const root = parse5.parse(profile);
    const websiteContainer = findNodes(root, "div", { "class": "views-field views-field-field-website" })[0];
    const websites = findNodes(websiteContainer, "a");

    if (websites.length > 0) {
      const information = findNodes(root, "div", { "class": "views-field views-field-title" })[0];
      let name = findNodes(information, "h1")[0].childNodes[0].value.toString().trim();
      name = name.replace(/(.+)\s+(\w+)/, "$2, $1");

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

module.exports = parseStanford;
