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

function matchesNode(elem, name, attrs = {}) {
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

module.exports = { findNodes };
