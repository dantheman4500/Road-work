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
    findProfileByName(profileName: String!): Profile
    findProfileByInterest(profileInterest: String!): [Profile]
  }

  type Checkout {
    session: ID
  }

  input Product{
    name: String
    description: String
    price: Int
  }

  type Query{
    checkout(products: [Product]!): Checkout
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    
  }
`;

module.exports = typeDefs;
