const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    image: String
    userBio: String
    interests: [String]
    friendRequests: [FriendRequest]
    friends: [Friend]
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
    currentUser: UserData
    userById(id: ID!): UserData
    users: [UserData]
    friendRequests(id: ID!): [FriendRequest]
    friends(id: ID!): [Friend]
    getConversations(id: ID!): [Conversation]

  }

  type Checkout {
    session: ID
  }

  input Product{
    name: String
    description: String
    price: Int
  }

  type Conversation {
    id: ID!
    members: [member]
    createdAt: String!
  }

  type FriendRequest {
    id: ID!
    userId: ID!
    firstName: String!
    createdAt: String!
  }
  type Friend {
    id: ID!
    userId: ID!
    firstName: String!
    createdAt: String!
  
  }

  type UserData {
    user: Profile
  }

  type member {
    sender: String!
    receiver: String!
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    createProfile(firstName: String!, lastName: String!, email: String!, password: String!, userBio: String!, interests: [String]!): Auth
    deleteProfile(profileId: ID!): Profile
    addInterest(profileId: ID!, interest: String!): Profile
    deleteInterest(profileId: ID!, interest: String!): Profile
    updateUserBio(profileId: ID!, userBio: String!): Profile
    friendRequest(id: ID!): Profile
    acceptFriendRequest(email: String!): Profile
    declineFriendRequest(email: String!): Profile
    unFriend(email: String!): Profile
    createConversation(sender: String!, receiver: String!): Conversation

  }
`;

module.exports = typeDefs;
