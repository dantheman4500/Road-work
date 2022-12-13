const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    image: String
    interests: [String]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
  }

  type Checkout {
    session: ID
  }


  type Mutation {
    login(email: String!, password: String!): Auth
    checkout(products: [ID]!): Checkout
  }
`;

module.exports = typeDefs;
