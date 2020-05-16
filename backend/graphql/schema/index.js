const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Video {
    _id: ID!
    title: String!
    authorName: String!
    url: String!
    creator: User!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    addedVideos: [Video!]
  }

  input VideoInput {
    title: String!
    authorName: String!
    url: String!
  }

  input UserInput {
    email: String!
    password: String!
  }

  type RootQuery {
      videos: [Video!]!
  }
  type RootMutation {
      createVideo(videoInput: VideoInput): Video
      createUser(userInput: UserInput): User
  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);

module.exports = schema;
