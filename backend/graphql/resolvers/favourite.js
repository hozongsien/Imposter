/* eslint-disable no-underscore-dangle */
const Video = require('../../models/video');
const Favourite = require('../../models/favourite');
const { getUser, getVideo } = require('./populateHelper');

const transformFavourite = (fav) => {
  return {
    ...fav._doc,
    video: getVideo.bind(this, fav._doc.video),
    user: getUser.bind(this, fav._doc.user),
  };
};

const favouriteResolver = {
  favourites: async () => {
    const favs = await Favourite.find();
    return favs.map((fav) => transformFavourite(fav));
  },
  favouriteVideo: async (args) => {
    const fetchedVideo = await Video.findOne({ _id: args.videoId });
    const fav = new Favourite({
      video: fetchedVideo,
      user: '5ebfdfa4cffe77304116483b',
    });

    const result = await fav.save();
    return transformFavourite(result);
  },
  unFavouriteVideo: async (args) => {
    const fav = await Favourite.findById(args.favouriteId).populate('video');
    const video = { ...fav.video._doc, creator: getUser.bind(this, fav.video._doc.creator) };
    await Favourite.deleteOne({ _id: args.favouriteId });

    return video;
  },
};

module.exports = favouriteResolver;
