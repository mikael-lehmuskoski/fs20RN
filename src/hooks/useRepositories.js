import { useQuery } from '@apollo/react-hooks';

import queries from '../graphql/queries';

const useRepositories = () => {
  const { loading, error, data } = useQuery(queries.GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if ( error ) console.log(error);

  return { repositories: data ? data?.repositories : null, loading, refetch: useRepositories };
};

export default useRepositories;