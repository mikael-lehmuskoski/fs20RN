import React from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { format } from 'date-fns';
import { Link } from 'react-router-native';

import theme from '../theme';
import Text from './Text';

const ratingSize = 50;
const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.primary
  },
  detailsContainer: {
    margin: 10,
    padding: 15,
    flex: 1,
    flexDirection: "row",
  },
  details:{
    marginLeft: 10,
    marginRight: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    flexWrap: "wrap",
  },
  text:{
    marginTop: 15,
    flexWrap: "wrap",
  },
  ratingContainer:{
    margin: 5,
    borderColor: theme.colors.secondary,
    height: ratingSize,
    width: ratingSize,
    borderRadius: ratingSize / 2,
    borderWidth: 3,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center"
  },
  rating:{
    color: theme.colors.secondary,
  },
  buttonContainer: {
    marginTop: 0,
    margin: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.colors.secondary,
    margin: 10,
    borderRadius: 5,
    padding: 15,
  },
  deleteButton: {
    backgroundColor: theme.colors.tertiary
  },
  buttonText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: theme.colors.textTertiary,
  },
});

const Button = ({ item, handleDelete }) => {
  return (
    <Link 
      to={handleDelete ? '/myreviews/' : `/repo/${item.repository.id}`} 
      component={TouchableOpacity} 
      onClick={handleDelete ? () => handleDelete(item.id) : null }
    >
      <View style={[ styles.button, handleDelete && styles.deleteButton ]} >
        <Text style={styles.buttonText}>{ handleDelete ? 'Delete review' : 'View repository' }</Text>
      </View>
    </Link>
  );
};

const ReviewItem = ({ item, user, handleDelete }) => {
  if (!item) return null;
  return (
    <View style={styles.container} >
      <View testID={`${item.id}_container`} style={styles.detailsContainer}>
        <View testID={`${item.id}_ratingContainer`} style={styles.ratingContainer} >
          <Text testID={`${item.id}_rating`} style={styles.rating} fontWeight="bold" >{item.rating}</Text>
        </View>
        <View style={styles.details} >
          {
            user ? 
            <Text testID={`${item.id}_fullname`} fontWeight="bold" fontSize="subheading" >{item.repository.fullName}</Text> :
            <Text testID={`${item.id}_username`} fontWeight="bold" fontSize="subheading" >{item.user.username}</Text>
          }
          <Text testID={`${item.id}_createdAt`} color="textSecondary" fontSize="subheading" >{format(new Date(item.createdAt), "dd.MM.y")}</Text>
          <Text testID={`${item.id}_text`} style={styles.text} >{item.text}</Text>
        </View>
      </View>
      {
        user &&
        <View style={styles.buttonContainer}>
          <Button item={item} />
          <Button item={item} handleDelete={handleDelete} />
        </View>
      }
    </View>
  );
};

export default ReviewItem;