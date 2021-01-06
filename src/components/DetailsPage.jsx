import React from "react";
import { useParams } from "react-router-dom";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";

import RepositoryItem from './repositoryItem';
import useSingleRepo from '../hooks/useSingleRepo';
import ReviewItem from './ReviewItem';

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

const DetailsPage = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useSingleRepo(id);

  //console.log(repository?.reviews);
  const reviewNodes = repository
  ? repository?.reviews?.edges?.map((edge) => edge?.node)
  : [];

  const onEndReached = () => {
    console.log(
      'end'
    );
    fetchMore();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem item={item} />}
        valueExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryItem item={repository} single />}
        onEndReachedThreshold={0.7}
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default DetailsPage;