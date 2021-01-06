import React from "react";
import { TouchableOpacity } from "react-native";
import { useHistory } from 'react-router-native';

import Details from './Details';

const RepositoryItem = ({ item, single }) => {
  const history = useHistory();

  if (!item) return null;
  if (single) {
    return (
      <Details item={item} withButton />
    );
  } else {
    return (
      <TouchableOpacity onPress={() => history.push(`/repo/${item?.id}`)}>
        <Details item={item} /> 
      </TouchableOpacity>
    );
  }
};

export default RepositoryItem;
