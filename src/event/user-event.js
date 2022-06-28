const events = require('events');
const wsServer = require('../../ws-server');

const actions = {
  LOGIN_ATTEMPT_ERROR: 'LOGIN_ATTEMPT_ERROR',
};
const eventEmitter = new events.EventEmitter();
eventEmitter.on(actions.LOGIN_ATTEMPT_ERROR, (acct) => {
  const data = {
    acct,
    action: actions.LOGIN_ATTEMPT_ERROR,
  };
  setImmediate(() => {
    wsServer.broadcast(JSON.stringify(data));
  });
});

module.exports = { actions, eventEmitter };
