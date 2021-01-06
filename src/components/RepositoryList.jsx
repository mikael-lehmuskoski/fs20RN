import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Dimensions } from 'react-native';

import RepositoryItem from './repositoryItem';
import useRepositories from '../hooks/useRepositories';
import Filterer from './Filterer';

const sortOptions = {
  orderBy: [
    { value: "CREATED_AT", label: "Creation date" }, 
    { value: "RATING_AVERAGE", label: "Rating" }
  ], 
  orderDirection: [
    { value: "ASC", label: ", ascending" }, 
    { value: "DESC", label: ", descending" }
  ],
};
const defaultOrder = sortOptions.orderBy.find(element => element.value === "CREATED_AT");
const defaultDirection = sortOptions.orderDirection.find(element => element.value === "ASC");

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  separator: {
    height: 5,
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    width: win.width,
    height: win.height,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, handleSort, orderBy, orderDirection, handleSearch, onEndReached }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  
  return (
    <View style={styles.container}>
      <Filterer 
        handleSort={handleSort} 
        sortOptions={sortOptions} 
        orderBy={orderBy} 
        orderDirection={orderDirection} 
        defaultOrder={defaultOrder} 
        defaultDirection={defaultDirection} 
        handleSearch={handleSearch}
      />
      <FlatList
        data={repositoryNodes}
        onEndReachedThreshold={0.7}
        onEndReached={onEndReached}
        ItemSeparatorComponent={ItemSeparator}
        valueExtractor={({ id }) => id}
        renderItem={({ item }) => <RepositoryItem item={item} />}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState(defaultOrder);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [orderDirection, setOrderDirection] = useState(defaultDirection);
  const { repositories, fetchMore } = useRepositories( orderBy.value, orderDirection.value, searchKeyword );

  const handleSort = (options) => {
    const parsedOptions = JSON.parse(options);

    setOrderBy(
      sortOptions.orderBy.find(element => element.value === parsedOptions.orderBy) || defaultOrder
    );
    setOrderDirection(
      sortOptions.orderDirection.find(element => element.value === parsedOptions.orderDirection) || defaultDirection
    );
  };

  const handleSearch = (value) => {
    setSearchKeyword(value);
  };

  const onEndReached = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      handleSort={handleSort} 
      orderBy={orderBy}
      orderDirection={orderDirection} 
      handleSearch={handleSearch}
      onEndReached={onEndReached}
    />
  );
};

export default RepositoryList;