import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import * as Linking from 'expo-linking';

import { styles } from './styles';

const GithubButton = (url) => {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      <View style={styles.githubButton} >
        <Text style={styles.githubButtonText}>Open in GitHub</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GithubButton;