const parseBerkeley = require('./school_parsers/berkeley');
const parseCMU = require('./school_parsers/cmu');
const parseHarvard = require('./school_parsers/harvard');
const parseStanford = require('./school_parsers/stanford');

// constructor function for parser
function Parser(html, school) {
  this.raw = html;
  this.result = [];
  this.parse = {
    berkeley: parseBerkeley,
    cmu: parseCMU,
    harvard: parseHarvard,
    stanford: parseStanford
  }[school]
}

module.exports = Parser;
