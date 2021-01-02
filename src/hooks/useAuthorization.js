import { useQuery } from '@apollo/react-hooks';

import queries from '../graphql/queries';

const useAuthorization = async () => {
  const { loading, error, data } = await useQuery(queries.AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });

  if ( error ) console.log(error);

  return { authorizedUser: data ? data?.authorizedUser : null, loading, refetch: useAuthorization };
};

export default useAuthorization;