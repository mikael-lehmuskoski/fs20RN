import { useQuery } from '@apollo/react-hooks';
import queries from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const variables =  {
    first: 1,
    orderBy,
    orderDirection,
    searchKeyword
  };
  const { loading, error, fetchMore, data } = useQuery(
    queries.GET_REPOSITORIES, 
    {
      variables,
      fetchPolicy: 'cache-and-network',
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: queries.GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };


  if ( error ) console.log(error);

  return { repositories: data ? data?.repositories : null, loading, fetchMore: handleFetchMore, refetch: useRepositories };
};

export default useRepositories;