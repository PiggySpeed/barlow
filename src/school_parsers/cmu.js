const parse5 = require('parse5');
const schools = require('../config/schools');
const { findNodes } = require('../utils/parser_helpers');
const { throttleRequests } = require('../utils/request_helpers');

async function parseCMU() {
  const html = parse5.parse(this.raw);
  const root = schools.cmu.protocol + '//' + schools.cmu.host;
  const table = findNodes(html, "table");
  const tableRows = findNodes(table[0], "td", { "class": "views-field views-field-field-computed-last-name"});

  const paths = [];
  for (let row of tableRows) {
    let link = findNodes(row, "a")[0].attrs[0].value.toString().trim();
    link = link.split(root).join("");
    paths.push(link);
    console.log(link);
  }

  const sites = [];
  const profiles = await throttleRequests(paths, { headers, protocol, host } = schools.cmu);
  for (let profile of profiles) {
    const root = parse5.parse(profile);
    const websites = findNodes(root, "a", { title: "Personal Website" });

    if (websites.length > 0) {
      const information = findNodes(root, "div", { "class": "information" })[0];
      let name = findNodes(information, "h2")[0].childNodes[0].value.toString().trim();
      name = name.replace(/(\w+)\s+(\w+)/, "$2, $1");

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

module.exports = parseCMU;
