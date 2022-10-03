const {rabbitProducer} = require('./rabbitMq/producer');
const subscribe = require('./rabbitMq/subscriber');
const express = require('express');
const app = express();
const port = 3001;

subscribe();
rabbitProducer.start();

app.get('/', (req, res) => {
  res.send('Hello World from App1');
});

app.get('/testRabbit', (req, res) => {
  rabbitProducer.sendToApp2('What is up App2 dude?');
  res.send('Message to App2 sent');
});

app.listen(port, () => {
  console.log(`App1 listening on port ${port}`);
});