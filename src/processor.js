const Parser = require('./parser');

async function processHtml(html, cb) {
  const cmu = new Parser(html);

  await cmu.parseCMU();

  console.log('sending result...');
  cb(cmu.result);
}

module.exports = processHtml;