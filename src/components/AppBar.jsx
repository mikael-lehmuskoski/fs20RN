import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, Text  } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useContext } from 'react';
import useAuthorization from '../hooks/useAuthorization';

import theme from '../theme';

import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.AppBarTab,
    paddingTop: Constants.statusBarHeight + 10 || 20,
    padding: 20,
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
  }
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [ isSignedIn, setIsSignedIn ] = useState(false);
  
  useAuthorization()
    .then(auth => {
      if (!auth?.loading && auth?.authorizedUser) {
        setIsSignedIn(auth?.authorizedUser?.id && auth?.authorizedUser?.username ? true : false);
      }
    });

  const handleSignout = async () => {
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
        <View>
          {
            isSignedIn ? 
            <Link to="/" component={TouchableWithoutFeedback} onClick={() => handleSignout()} >
              <View>
                <Text style={styles.tabText}>Logout</Text>
              </View>
            </Link> :
            <Link to="/login" component={TouchableWithoutFeedback} >
              <View>
                <Text style={styles.tabText}>Login</Text>
              </View>
            </Link>
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;