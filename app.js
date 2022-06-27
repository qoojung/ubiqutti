require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const route = require('./src/router');
const apiResp = require('./src/helper/api-response');
const swaggerDocument = require('./swagger.json');

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
  app.listen(port, () => {
    console.log(`Service is started at PORT ${port}`);
  });
}
(() => {
  startSever();
})();
