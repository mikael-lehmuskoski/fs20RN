import React, {useState} from 'react';
import { View, Text, FlatList, Platform, Alert } from "react-native";

import useAuthorization from '../hooks/useAuthorization';
import ReviewItem from './ReviewItem';
import useDeleteReview from '../hooks/useDeleteReview';
import { useHistory } from 'react-router-dom';

const includeReviews = true;
const alert = (id, doIt) => {
  Alert.alert(
    'Deleting review', 
    'Are you sure you want to delete this review',
    [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "delete", onPress: () => doIt(id) }
    ],
    { cancelable: false }
  );
};
const webAlert = (id, doIt) => {
  if (window.confirm('Are you sure you want to delete this review')) doIt(id);
  else return null;
};

const MyReviews = () => {
  const history = useHistory();
  const [ reviews, setReviews ] = useState(null);
  const [ deleteReview ] = useDeleteReview();

  useAuthorization(includeReviews)
    .then(auth => {
      if (!auth?.loading && auth?.authorizedUser?.id && auth?.authorizedUser?.username) {
        setReviews(auth?.authorizedUser?.reviews?.edges);
      }
    });

  const handleDelete = (id) => {
    Platform.select({
      android: alert(id, doIt),
      ios: alert(id, doIt),
      default: webAlert(id, doIt),
    });
  };

  const doIt = (id) => {
    deleteReview(id).then(del => del?.deleteReview ? history.push("/") : null);
  };

  if (!reviews) return null;
  if (reviews.length <= 0) return <View><Text>No reviews</Text></View>;
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem item={item.node} handleDelete={handleDelete} user />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;