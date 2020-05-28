const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Favourite', favouriteSchema);
