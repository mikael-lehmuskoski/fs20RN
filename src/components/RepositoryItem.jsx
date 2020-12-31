import React from "react";
import { View, Image, StyleSheet } from "react-native";

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 15,
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.primary
  },
  basics:{
    marginLeft: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    flexWrap: "wrap",
  },
  details:{
    marginTop: 15,
    marginLeft: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detail:{
    marginRight: 10,
    padding: 5,
    flexDirection: "column",
  },
  text:{
    marginBottom: 10,
    flexWrap: "wrap",
  },
  ownerImage:{
    marginLeft: 10,
    padding: 1,
    width: 75,
    height: 75,
    borderRadius: 15,
    borderColor: "black",
    overflow: "hidden",
  },
});

const RepositoryItem = (item) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image style={styles.ownerImage} source={{uri: item.ownerAvatarUrl}}/>
        <View style={styles.basics} >
          <Text fontWeight="bold" style={styles.text}  >{item.fullName}</Text>
          <Text style={styles.text} color="textSecondary" >{item.description}</Text>
          <Text tag >{item.language}</Text>
        </View>
      </View>
      <View style={styles.details} >
        <View style={styles.detail} >
          <Text fontWeight="bold" style={styles.text} >{compactinator9000(item.stargazersCount)}</Text>
          <Text color="textSecondary" >Stars</Text>
        </View>
        <View style={styles.detail} >
          <Text fontWeight="bold" style={styles.text} >{compactinator9000(item.forksCount)}</Text>
          <Text color="textSecondary" >Forks</Text>
        </View>
        <View style={styles.detail} >
          <Text fontWeight="bold" style={styles.text} >{compactinator9000(item.reviewCount)}</Text>
          <Text color="textSecondary" >Reviews</Text>
        </View>
        <View style={styles.detail} >
          <Text fontWeight="bold" style={styles.text} >{compactinator9000(item.ratingAverage)}</Text>
          <Text color="textSecondary" >Rating</Text>
        </View>
      </View>
    </View>
  );
};

const compactinator9000 = (number) => {
  if (number < 1000) return number;
  return Math.round((number / 1000) * 10) / 10 + "k";
};

export default RepositoryItem;
