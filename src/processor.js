const Parser = require('./parser');

async function processHtml(html, cb) {
  const parser = new Parser(html);

  // await cmu.parseCMU();
  await parser.parseHarvard();

  console.log('sending result...');
  cb(parser.result);
}

module.exports = processHtml;