const ws = require('ws');

const wsServer = new ws.Server({ noServer: true, path: '/ws' });
wsServer.broadcast = (data) => {
  wsServer.clients.forEach((client) => {
    if (client.readyState === ws.WebSocket.OPEN) {
      client.send(data);
    }
  });
};
module.exports = wsServer;
