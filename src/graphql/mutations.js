import { gql } from 'apollo-boost';

const AUTHORIZE = gql`
  mutation authorize($credentials: AuthorizeInput!){
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

const CREATE_REVIEW = gql`
  mutation createReview(
    $review: CreateReviewInput!
  ) {
    createReview(
      review: $review
    ) {
      id
      repositoryId
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser(
    $user: CreateUserInput!
  ) {
    createUser(
      user: $user
    ) {
      id
      username
    }
  }
`;

const DELETE_REVIEW = gql`
  mutation deleteReview(
    $id: ID!
  ) {
    deleteReview (id: $id)
  }
`;

export default {
  AUTHORIZE,
  CREATE_REVIEW,
  CREATE_USER,
  DELETE_REVIEW,
};