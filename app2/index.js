const express = require('express');
const subscribe = require('./rabbitMq/subscriber');
const {rabbitProducer} = require('./rabbitMq/producer')
const app = express();
const port = 3002;

subscribe();
rabbitProducer.start();

app.get('/', (req, res) => {
  res.send('Hello World from App2');
});

app.get('/testRabbit', (req, res) => {
  rabbitProducer.sendToApp1('What is up App1 dude?');
  res.send('Message to App1 sent');
});

app.listen(port, () => {
  console.log(`App2 listening on port ${port}`);
});