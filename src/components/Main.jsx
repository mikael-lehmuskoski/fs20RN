import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from "./RepositoryList";
import SignIn from './SignIn';
import DetailsPage from './DetailsPage';
import Review from './Review';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route exact path="/repo/:id">
          <DetailsPage />
        </Route>
        <Route path="/review/:id">
          <Review />
        </Route>
        <Route exact path="/review/">
          <Review />
        </Route>
        <Route path="/myreviews/">
          <MyReviews />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/">
          <RepositoryList />
        </Route> 
      </Switch>
    </View>
  );
};

export default Main;