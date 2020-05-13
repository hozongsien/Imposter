const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const videos = [];

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
    return videos;
  },
  createVideo: (args) => {
    const video = {
      _id: Math.random().toString(),
      title: args.videoInput.title,
      authorName: args.videoInput.authorName,
      url: args.videoInput.url,
    };
    videos.push(video);
    return video;
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

server.listen(5000, () => console.log('Now browse to localhost:5000/graphql'));
