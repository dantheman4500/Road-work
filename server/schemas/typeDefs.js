const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    firstName: String
    lastName: String
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
    findProfileByInterest(profileInterest: String!): [Profile]
    checkout(products: [Product]!): Checkout
  }

  type Checkout {
    session: ID
  }

  input Product{
    name: String
    description: String
    price: Int
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createProfile(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    
  }
`;

module.exports = typeDefs;
