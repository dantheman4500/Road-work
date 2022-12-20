import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation createProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $userBio: String!
    $interests: [String]!
  ) {
    createProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      userBio: $userBio
      interests: $interests
    ) {
      token
      profile {
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      products{
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`

export const ADD_INTEREST = gql`
  mutation addInterest($profileId: ID!, $interest: String!) {
    addInterest(profileId: $profileId, interest: $interest) {
      _id
      interests
    }
  }
`;
export const DELETE_INTEREST = gql`
  mutation deleteInterest($profileId: ID!, $interest: String!) {
    deleteInterest(profileId: $profileId, interest: $interest) {
      _id
      interests
    }
  }
`;

export const UPDATE_BIO = gql`
  mutation updateUserBio($profileId: ID!, $userBio: String!) {
    updateUserBio(profileId: $profileId, userBio: $userBio) {
      _id
      userBio
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const DELETE_PROFILE = gql`
mutation deleteProfile(
  $profileId: ID!
) {
  deleteProfile(
    profileId: $profileId
  ) {
    email
    _id
    firstName
    lastName
  }
}
`

const SEND_FRIEND_REQUEST = gql`
  mutation friendReq($id: ID!) {
    friendRequest(id: $id) {
      id
      friendRequests {
        id
      }
    }
  }
`

const ACCEPT_FRIEND_REQUEST = gql`
  mutation acceptFriendReq($id: ID!) {
    acceptFriendRequest(ID: $id) {
      id
      friendRequests {
        id
      }
      friends {
        id
      }
    }
  }
`

const DECLINE_FRIEND_REQUEST = gql`
  mutation declineFriendRequest($id: ID!) {
    declineFriendRequest(id: $id) {
      id
    }
  }
`

const UNFRIEND = gql`
  mutation unFriend($id: ID!) {
    unFriend(id: $id) {
      id
      friends {
        id
      }
    }
  }
`