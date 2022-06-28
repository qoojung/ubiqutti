const { WebSocket } = require('ws');

const token = process.argv[2];
if (!token) {
  console.log('Please give JWT token');
  process.exit(1);
}

const ws = new WebSocket(`ws://localhost:3000/ws?token=${token}`);
ws.onerror = (event) => {
  console.log('WebSocket error');
  console.log(event.error);
};
ws.onopen = () => {
  console.log('WebSocket connection established');
};
ws.onmessage = (event) => {
  console.log(`Received ${event.data}`);
};
ws.onclose = () => {
  console.log('WebSocket connection closed');
};
