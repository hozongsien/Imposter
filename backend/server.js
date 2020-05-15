/* eslint-disable no-underscore-dangle */
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Video = require('./models/videos');

const schema = buildSchema(`
  type Video {
    _id: ID!
    title: String!
    authorName: String!
    url: String!
  }

  input VideoInput {
    title: String!
    authorName: String!
    url: String!
  }

  type RootQuery {
      videos: [Video!]!
  }
  type RootMutation {
      createVideo(videoInput: VideoInput): Video
  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);

const rootValue = {
  videos: () => {
    const getDoc = async () => {
      const videos = await Video.find();
      return videos.map((video) => {
        return { ...video._doc };
      });
    };

    return getDoc();
  },
  createVideo: (args) => {
    const video = new Video({
      title: args.videoInput.title,
      authorName: args.videoInput.authorName,
      url: args.videoInput.url,
    });

    const getDoc = async (vid) => {
      const result = await vid.save();
      const doc = await { ...result._doc };
      return doc;
    };

    return getDoc(video);
  },
};

const server = express();
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
