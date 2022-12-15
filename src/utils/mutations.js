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