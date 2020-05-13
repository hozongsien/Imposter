import express from 'express';

const server = express();

server.use(express.json());

server.get('/', (req, res, next) => {
  res.send('Hello World');
});

server.listen(5000);
