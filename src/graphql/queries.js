import { gql } from 'apollo-boost';

const GET_REPOSITORIES = gql`
  query repositories (
      $orderBy: AllRepositoriesOrderBy 
      $orderDirection: OrderDirection
      $searchKeyword: String
      $after: String
      $first: Int
    ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
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
        cursor
      }
      pageInfo {
        hasNextPage
        totalCount
        startCursor
        endCursor
      }
    }
  }
`;

const AUTHORIZED_USER = gql`
  query authorizedUser(
    $includeReviews: Boolean!
  ){
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            repository {
              id
            	fullName
            }
            userId
            repositoryId
            rating
            createdAt
            text
          }
        }
      }
    }
  }
`;

const REPOSITORY = gql`
  query repository(
    $id: ID!
    $after: String
    $first: Int
  ){
    repository(
      id: $id
    ) {
      id
      ownerName
      name
      createdAt
      fullName
      ratingAverage
      reviewCount
      stargazersCount
      watchersCount
      forksCount
      openIssuesCount
      url
      ownerAvatarUrl
      description
      language
      authorizedUserHasReviewed
      reviews (first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          totalCount
          startCursor
          endCursor
        }
      }
    }
  }
`;

export default {
  GET_REPOSITORIES,
  AUTHORIZED_USER,
  REPOSITORY
};