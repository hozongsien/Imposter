const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./graphql/schema/index');
const rootValue = require('./graphql/resolvers/index');
const isAuthenticated = require('./middleware/is-auth');

const server = express();

server.use(isAuthenticated);

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-i55mj.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    server.listen(5000, () => console.log('Now browse to localhost:5000/graphql'));
  })
  .catch((err) => console.log(err));
