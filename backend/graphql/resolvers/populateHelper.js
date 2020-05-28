/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
const Video = require('../../models/video');
const User = require('../../models/user');

const getVideos = async (ids) => {
  const vids = await Video.find({ _id: { $in: ids } });
  return vids.map((vid) => {
    return { ...vid._doc, creator: getUser.bind(this, vid.creator) };
  });
};

const getVideo = async (id) => {
  const vid = await Video.findById(id);
  return { ...vid._doc, creator: getUser.bind(this, vid.creator) };
};

const getUser = async (id) => {
  const usr = await User.findById(id);
  return { ...usr._doc, addedVideos: getVideos.bind(this, usr.addedVideos) };
};

exports.getVideos = getVideos;
exports.getVideo = getVideo;
exports.getUser = getUser;
