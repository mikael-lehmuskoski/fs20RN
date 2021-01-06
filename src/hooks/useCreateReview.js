import { useMutation } from '@apollo/react-hooks';

import mutations from '../graphql/mutations';

const useSignIn = () => {
  const [ mutate, result ] = useMutation(mutations.CREATE_REVIEW);

  const createReview = async (variables) => {
    const { data } = await mutate(variables);
    return data;
  };

  return [ createReview, result ];
};

export default useSignIn;