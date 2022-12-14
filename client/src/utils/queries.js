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
      name
      interests
      image
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
      name
      interests
      image
    }
  }
`;