import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  error: {
    borderColor: theme.colors.errors.primary,
    backgroundColor: theme.colors.errors.secondary,
  },
  textField: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: theme.colors.secondary 
  }
});

const TextInput = ({ style, error, secureTextEntry, ...props }) => {
  const textInputStyle = [
    style,
    styles.textField,
    error && styles.error
  ]; 

  return <NativeTextInput style={textInputStyle} secureTextEntry={secureTextEntry} {...props} />;
};

export default TextInput;