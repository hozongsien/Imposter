/* eslint-disable no-underscore-dangle */

const bcrypt = require('bcryptjs');
const Video = require('../../models/video');
const User = require('../../models/user');
const Favourite = require('../../models/favourite');

const getVideos = async (ids) => {
  const vids = await Video.find({ _id: { $in: ids } });
  return vids.map((vid) => {
    // eslint-disable-next-line no-use-before-define
    return { ...vid._doc, creator: getUser.bind(this, vid.creator) };
  });
};

const getVideo = async (id) => {
  const vid = await Video.findById(id);
  // eslint-disable-next-line no-use-before-define
  return { ...vid._doc, creator: getUser.bind(this, vid.creator) };
};

const getUser = async (id) => {
  const usr = await User.findById(id);
  return { ...usr._doc, addedVideos: getVideos.bind(this, usr.addedVideos) };
};

const rootValue = {
  favourites: async () => {
    const favs = await Favourite.find();
    return favs.map((fav) => {
      return {
        ...fav._doc,
        video: getVideo.bind(this, fav._doc.video),
        user: getUser.bind(this, fav._doc.user),
      };
    });
  },
  videos: async () => {
    const vids = await Video.find();
    const doc = vids.map((vid) => {
      return { ...vid._doc, creator: getUser.bind(this, vid._doc.creator) };
    });

    return doc;
  },
  createVideo: async (args) => {
    const video = new Video({
      title: args.videoInput.title,
      authorName: args.videoInput.authorName,
      url: args.videoInput.url,
      creator: '5ebfdfa4cffe77304116483b',
    });

    const videoResult = await video.save();
    const doc = await { ...videoResult._doc, creator: getUser.bind(this, videoResult.creator) };

    const user = await User.findById('5ebfdfa4cffe77304116483b');
    if (!user) {
      throw new Error('User not found');
    }

    user.addedVideos.push(video);
    await user.save();

    return doc;
  },
  favouriteVideo: async (args) => {
    const fetchedVideo = await Video.findOne({ _id: args.videoId });
    const fav = new Favourite({
      video: fetchedVideo,
      user: '5ebfdfa4cffe77304116483b',
    });

    const result = await fav.save();
    return {
      ...result._doc,
      video: getVideo.bind(this, fav._doc.video),
      user: getUser.bind(this, fav._doc.user),
    };
  },
  unFavouriteVideo: async (args) => {
    const fav = await Favourite.findById(args.favouriteId).populate('video');
    const video = { ...fav.video._doc, creator: getUser.bind(this, fav.video._doc.creator) };
    await Favourite.deleteOne({ _id: args.favouriteId });

    return video;
  },
  createUser: async (args) => {
    const user = await User.findOne({ email: args.userInput.email });
    if (user) {
      throw new Error('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    const newUser = new User({
      email: args.userInput.email,
      password: hashedPassword,
    });
    const result = await newUser.save();
    const doc = await { ...result._doc, password: null };

    return doc;
  },
};

module.exports = rootValue;
