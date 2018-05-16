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
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    protocol: 'https:',
    host: 'www.cis.upenn.edu',
    path: '/about-people/index.php'
  }
};

module.exports = schools;
