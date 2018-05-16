const schools = {
  cmu: {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    protocol: 'https:',
    host: 'csd.cs.cmu.edu',
    path: '/directory/faculty'
  },
  harvard: {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    protocol: 'https:',
    host: 'www.seas.harvard.edu',
    path: '/computer-science/people'
  },
  stanford: {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    protocol: 'https:',
    host: 'cs.stanford.edu',
    path: '/directory/faculty'
  },
  berkeley: {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    protocol: 'https:',
    host: 'www2.eecs.berkeley.edu',
    path: '/Faculty/Lists/CS/faculty.html'
  },
  upenn: {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
    },
    protocol: 'https:',
    method: 'GET',
    hostname: 'www.cis.upenn.edu',
    path: '/about-people/'
  }
};

module.exports = schools;
