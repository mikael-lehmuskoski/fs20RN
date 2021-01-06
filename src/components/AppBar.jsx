import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, Text  } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useContext } from 'react';
import useAuthorization from '../hooks/useAuthorization';
import { useLocation } from "react-router-dom";

import theme from '../theme';

import AuthStorageContext from '../contexts/AuthStorageContext';

const IN = null;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.AppBarTab,
    paddingTop: Constants.statusBarHeight + 10 || 20,
    padding: 20,
  },
  otherTabs: {
    flexDirection: "row"
  },
  scrollView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },  
  title: {
    //fontSize: theme.fontSizes.AppBar,
  },
  tabText: {
    color: "white",
    fontWeight: theme.fontWeights.bold,
    marginLeft: 15
  }
});

const Log = (handleSignout) => {
  if (handleSignout) {
    return (
      <Link to="/" component={TouchableWithoutFeedback} onClick={() => handleSignout()} >
        <View>
          <Text style={styles.tabText}>Logout</Text>
        </View>
      </Link>
    );
  } else {
    return (
      <Link to="/login" component={TouchableWithoutFeedback} >
        <View>
          <Text style={styles.tabText}>Login</Text>
        </View>
      </Link>
    );
  }
};

const ReviewTab = (id) => {
  return (
    <Link to={id ? `/review/${id}` : `/review/`} component={TouchableWithoutFeedback} >
      <View>
        <Text style={styles.tabText}>Create a review</Text>
      </View>
    </Link>
  );
};

const MyReviewsTab = () => {
  return (
    <Link to={`/myreviews/`} component={TouchableWithoutFeedback} >
      <View>
        <Text style={styles.tabText}>My reviews</Text>
      </View>
    </Link>
  );
};

const SignupTab = () => {
  return (
    <Link to="/signup/" component={TouchableWithoutFeedback} >
      <View>
        <Text style={styles.tabText}>Sign up</Text>
      </View>
    </Link>
  );
};

const AppBar = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[pathname.split('/').length - 1] ? pathname.split('/')[pathname.split('/').length - 1] : null ;
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [ isSignedIn, setIsSignedIn ] = useState(false);

  useAuthorization()
    .then(auth => {
      if (!auth?.loading && auth?.authorizedUser) {
        setIsSignedIn(auth?.authorizedUser?.id && auth?.authorizedUser?.username ? true : false);
      }
    });

  const out = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    setIsSignedIn(false);
  };

  return (
    <View style={styles.container} >
      <ScrollView contentContainerStyle={styles.scrollView} horizontal >
        <View style={styles.title} >
          <Link to="/" component={TouchableWithoutFeedback} >
            <View>
              <Text style={styles.tabText}>Repositories</Text>
            </View>
          </Link>
        </View>
        <View style={styles.otherTabs} >
          <View>
            {
              isSignedIn ? ReviewTab(id) : SignupTab()
            }
          </View>
          <View>
            {
              isSignedIn && MyReviewsTab()
            }
          </View>
          <View>
            {
              isSignedIn ? Log(out) : Log(IN)
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;