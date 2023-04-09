'use strict';

const common = require('../common');
const cp = require('child_process');
const http = require('http');

if (process.argv[2] === 'server') {
  process.on('disconnect', () => process.exit(0));

  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end();
  });
  
  server.listen(0, () => {
    process.send(server.address().port);
  });
} else {
  const serverProcess = cp.fork(__filename, ['server'], { stdio: ['ignore', 'ignore', 'ignore', 'ipc'] });
  serverProcess.once('message', common.mustCall((port) => {
    serverProcess.channel.unref();
    serverProcess.unref();
    const agent = new http.Agent({ keepAlive: true });
    http.get({ host: common.localhostIPv4, port, agent }, common.mustCall());
  }));
  
  // If any sockets are left open, we'll hit the below instead of exiting.
  setTimeout(common.mustNotCall(), common.platformTimeout(3000)).unref();
}

