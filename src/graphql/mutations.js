import { gql } from 'apollo-boost';

const AUTHORIZE = gql`
  mutation authorize($credentials: AuthorizeInput!){
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export default {
  AUTHORIZE
};