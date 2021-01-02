import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';

import mutations from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [ mutate, result ] = useMutation(mutations.AUTHORIZE);

  const signIn = async (variables) => {
    const { data } = await mutate(variables);
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
    return data;
  };

  return [ signIn, result ];
};

export default useSignIn;