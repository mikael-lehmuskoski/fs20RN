import { useQuery } from '@apollo/react-hooks';
import queries from '../graphql/queries';

const useAuthorization = async (includeReviews = false) => {
  const { loading, error, data } = await useQuery(queries.AUTHORIZED_USER, {
    variables: {
      includeReviews
    },
    fetchPolicy: 'network-only',
  });

  if ( error ) console.log(error);

  return { authorizedUser: data ? data?.authorizedUser : null, loading, refetch: useAuthorization };
};

export default useAuthorization;