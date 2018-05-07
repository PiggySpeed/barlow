const https = require('https');

async function throttleRequests(paths, baseOptions) {
  let n = 0;
  const TIMEOUT = 500;
  let accumulator = Promise.resolve([]);

  const results = [];
  await paths.reduce((acc, curr) => {
    return acc
      .then(() => {
        return sendRequest(Object.assign({}, baseOptions, { path: curr }))
          .then(response => {
            return new Promise(resolve => {
              console.log('request: ', n++);
              setTimeout(resolve, TIMEOUT, results.push(response));
            });
          });
      });
  }, accumulator);

  return results;
}

// Private functions
function sendRequest(options) {
  return new Promise((resolve, reject) => {
    https.get(options, function(res) {
      res.setEncoding('utf8');

      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        resolve(rawData);
      });
      res.on('error', (err) => {
        reject(err);
      });
    });
  });
}


module.exports = { throttleRequests };
