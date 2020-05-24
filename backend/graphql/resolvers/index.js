const authResolver = require('./auth');
const videoResolver = require('./video');
const favouriteResolver = require('./favourite');

const rootResolver = {
  ...authResolver,
  ...videoResolver,
  ...favouriteResolver,
};

module.exports = rootResolver;
