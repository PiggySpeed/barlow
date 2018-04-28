const parse5 = require('parse5');
const throttledRequests = require('./requests');

// constructor function for parser
function Parser(html) {
  this.raw = html;
  this.result = [];
}

Parser.prototype.parseCMU = async function() {
  const cmu = parse5.parse(this.raw);
  const root = /(https:\/\/csd\.cs\.cmu\.edu)/g;
  const table = findNodes(cmu, "table");
  const tableRows = findNodes(table[0], "td", { "class": "views-field views-field-field-computed-last-name"});

  const paths = [];
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
    host: 'csd.cs.cmu.edu'
  };

  const sites = [];
  const profiles = await throttledRequests(paths, baseOptions);
  for (let profile of profiles) {
    const root = parse5.parse(profile);
    const website = findNodes(root, "a", { title: "Personal Website" });

    if (website.length > 0) {
      const information = findNodes(root, "div", { "class": "information" })[0];
      let name = findNodes(information, "h2")[0].childNodes[0].value.toString().trim();
      name = name.replace(/(\w+)\s+(\w+)/, "$2, $1");

      const url = website[0].attrs[0].value.toString().trim();

      sites.push({ name, url })
    }
  }

  this.result = sites;
};

// helpers
function findNodes(rootNode, name, attrs = {}) {
  const results = [];

  (function find(elem, acc) {
    if (!elem) {
      return;
    }
    if (matchesNode(elem, name, attrs)) {
      acc.push(elem)
    }
    if (elem.childNodes) {
      elem.childNodes.forEach((child) => find(child, acc));
    }

  })(rootNode, results);


  return results;
}

function matchesNode(elem, name, attrs) {
  if (!elem || elem.nodeName !== name) {
    return false;
  }

  const entries = Object.entries(attrs);
  if (entries.length > 0) {
    for (const [key, value] of entries) {
      if (!elem.attrs.some(((attr) => (attr.name === key) && (attr.value === value)))) {
        return false;
      }
    }
  }

  return true;
}

module.exports = Parser;