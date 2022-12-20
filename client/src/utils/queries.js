import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      email
      image
      interests
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      firstName
      lastName
      email
      userBio
      interests
      image
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query Checkout($products: [Product]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
    }
  }
`;

export const QUERY_INTEREST = gql`
  query findProfileByInterest($profileInterest: String!) {
    findProfileByInterest(profileInterest: $profileInterest) {
      _id
      interests
      firstName
      lastName
    }
  }
`;

export const GET_USERS = gql `
  query users {
    Profile {
      Profile {
        id
        friendRequests {
          id
          createdAt
        }
        friends {
          id
          createdAt
        }
      }
    }
  }
`;

export const GET_USER_BY_ID = gql `
  query getUserById($id: ID!) {
    userById(id: $id) {
      query getUserById($profileId: ID!) {
        profile(profileId: $profileId) {
          _id
          firstName
          lastName
          email
          userBio
          interests
          image
        friendRequests {
          id
          userId
          firstName
          createdAt
        }
        friends {
          id
          firstName
          userId
          createdAt
        }
      }
    }
  }
}
`;
export const CURRENT_USER = gql `
  query currentUser {
    currentUser {
      Profile {
        id
        name
      }
    }
  }
`;


export const GET_FRIEND_REQUESTS = gql `
  query getFriendRequests($id: ID!) {
    userById(id: $id) {
      Profile {
        friendRequests {
          id
          userId
          createdAt
        }
      }
    }
  }
`;

export const GET_CONVERSATIONS_OF_A_USER = gql`
  query getConversations($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      members {
        sender
        receiver
      }
      createdAt
    }
  }
`

