import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';

import mutations from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';
import useSignIn from './useSignIn';

const useCreateUser = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [ mutate, result ] = useMutation(mutations.CREATE_USER);
  const [ signIn ] = useSignIn();

  const signUp = async (variables) => {
    const { data } = await mutate({ variables: { user: { ...variables }}});
    if (data.createUser.username && data.createUser.id) {
      const loginData = await signIn({ variables: { credentials: { ...variables }}});
      await authStorage.setAccessToken(loginData.authorize.accessToken);
      await apolloClient.resetStore();
      return loginData;
    }
  };

  return [ signUp, result ];
};

export default useCreateUser;