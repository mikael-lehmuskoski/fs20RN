import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorContainer: {
    marginTop: 5,
    height: 20,
  },
  errorText: {
    color: theme.colors.errors.primary
  },
});

const FormikTextInput = ({ name, secureTextEntry, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {showError && <View style={styles.errorContainer} ><Text style={styles.errorText} >{meta.error}</Text></View>}
    </>
  );
};

export default FormikTextInput;