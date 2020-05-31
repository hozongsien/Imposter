const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Favourite {
    _id: ID!
    video: Video!
    user: User!
  }

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

  type AuthData {
    userId: ID!
    email: String!
    token: String!
    tokenExpiration: Int!
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
      favourites: [Favourite!]!
      login(userInput: UserInput!): AuthData!
  }
  type RootMutation {
      createVideo(videoInput: VideoInput): Video
      createUser(userInput: UserInput): User
      favouriteVideo(videoId: ID!): Favourite!
      unFavouriteVideo(favouriteId: ID!): Video!
  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);

module.exports = schema;
