const Parser = require('./parser');

async function processHtml(html, school, cb) {
  const parser = new Parser(html, school);

  await parser.parse();

  console.log('sending result...');
  cb(parser.result);
}

module.exports = processHtml;