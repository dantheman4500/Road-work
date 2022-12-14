import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation createProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      profile {
        _id
      }
    }
  }
`;