require('dotenv').config();

const express = require('express');
const queryString = require('query-string');
const swaggerUi = require('swagger-ui-express');
const route = require('./src/router');
const apiResp = require('./src/helper/api-response');
const wsServer = require('./ws-server');
const swaggerDocument = require('./swagger.json');
const { checkPriviledges } = require('./src/service/auth');

process.on('unhandledRejection', (error, promise) => {
  console.log('unhandledRejection!', promise, error);
});
function startSever() {
  const app = express();
  const port = process.env.PORT || 3000;
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(express.json());
  app.use('/api/v1/', route);
  /* eslint-disable-next-line no-unused-vars */
  app.use((err, req, res, next) => {
    apiResp.sendErr(res, err.message || err);
  });
  const server = app.listen(port, () => {
    console.log(`Service is started at PORT ${port}`);
  });
  // bind server and ws
  server.on('upgrade', async (request, socket, head) => {
    const url = request.url || '';
    const urlTokens = url.split('?');
    if (urlTokens.length < 2) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
    const connectionParams = queryString.parse(urlTokens[1]);
    try {
      await checkPriviledges(connectionParams.token);
      wsServer.handleUpgrade(request, socket, head, (wsSocket) => {
        wsServer.emit('connection', wsSocket, request);
      });
    } catch (error) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
    }
  });
}
(() => {
  startSever();
})();
