import { useQuery } from '@apollo/react-hooks';
import queries from '../graphql/queries';

const useSingleRepo = (id) => {
  const { loading, error, fetchMore, data } = useQuery(
    queries.REPOSITORY, 
    { 
      variables: { 
        id,
        first: 2,
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    console.log(data.repository.reviews.pageInfo.endCursor);

    fetchMore({
      query: queries.REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first: 2,
        id,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...previousResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges
              ],
            },
          },
        };
        console.log(nextResult);
        return nextResult;
      },
    });
  };

  if ( error ) console.log(error);

  return { repository: data ? data?.repository : null, loading, fetchMore: handleFetchMore, refetch: useSingleRepo };
};

export default useSingleRepo;