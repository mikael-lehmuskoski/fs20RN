import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

import theme from '../theme';

const initialValues = {
  name: '',
  pw: '',
};

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  loginButton: {
    backgroundColor: theme.colors.tertiary,
    margin: 25,
    height: 40,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 15,
    padding: 10,
  },
  textInput: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    width: 250,
    borderRadius: 15,
    padding: 10,
  }
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(10, 'Maximum character count is 10')
    .required('Username is required'),
  pw: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(10, 'Maximum character count is 10')
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="name" placeholder="Username" style={styles.textInput} />
      <FormikTextInput name="pw" placeholder="Password" style={styles.textInput}  secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit} >
        <View style={styles.loginButton}>
          <Text style={{ color: theme.colors.textTertiary }} >Login</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    const name = values.name;
    const pw = values.pw;

    console.log(`logging in with: ${name} & ${pw}`);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;