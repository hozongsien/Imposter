/* eslint-disable no-underscore-dangle */
const Video = require('../../models/video');
const User = require('../../models/user');
const { getUser } = require('./populateHelper');

const transformVideo = (vid) => {
  return { ...vid._doc, creator: getUser.bind(this, vid.creator) };
};

const videoResolver = {
  videos: async () => {
    const vids = await Video.find();
    return vids.map((vid) => transformVideo(vid));
  },
  createVideo: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }

    const video = new Video({
      title: args.videoInput.title,
      authorName: args.videoInput.authorName,
      url: args.videoInput.url,
      creator: req.userId,
    });

    const videoResult = await video.save();
    const doc = await transformVideo(videoResult);

    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.addedVideos.push(video);
    await user.save();

    return doc;
  },
};

module.exports = videoResolver;
