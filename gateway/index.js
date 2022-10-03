import express from 'express';
import { setupLogging } from './logging.js';
import { setupProxies } from './proxy.js';
import { ROUTES } from './routes.js';
import {setupAuth} from './auth.js';

const app = express();
//app.use(cors());

const port = 3000;

//setupLogging(app);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);


app.get('/', (req, res) => {
  res.send('Microservice Gateway');
});


app.listen(port, () => {
  console.log(`Gateway listening on port ${port}`);
});