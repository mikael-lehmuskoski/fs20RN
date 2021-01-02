import { gql } from 'apollo-boost';

const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          ownerName
          name
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          url
          ownerAvatarUrl
          description
          language
        }
      }
    }
  }
`;

const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export default {
  GET_REPOSITORIES,
  AUTHORIZED_USER
};