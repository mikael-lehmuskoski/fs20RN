import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, Text  } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

//import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.AppBarTab,
    paddingTop: Constants.statusBarHeight + 5 || 20,
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
  titleText: {
    color: "white",
    fontWeight: theme.fontWeights.bold,
  },
  signinText: {
    color: "white",
    fontWeight: theme.fontWeights.bold,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container} >
      <ScrollView contentContainerStyle={styles.scrollView} horizontal >
        <View style={styles.title} >
          <Link to="/" component={TouchableWithoutFeedback} >
            <Text style={styles.titleText}>Repositories</Text>
          </Link>
        </View>
        <View>
          <Link to="/login" component={TouchableWithoutFeedback} >
            <Text style={styles.signinText}>Login</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppBar;