import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useHistory } from "react-router-dom";
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

import theme from '../theme';

import useCreateUser from '../hooks/useCreateUser';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
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
    borderRadius: 10,
    padding: 10,
  },
  loginButtonText: {
    color: theme.colors.textTertiary
  },
  textInput: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    width: 250,
    borderRadius: 10,
    padding: 10,
  }
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be at least 3 characters')
    .max(30, 'Maximum character count is 30')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Maximum character count is 50')
    .required('Password is required'),
    passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput testID="usernameField" name="username" placeholder="Username" style={styles.textInput} />
      <FormikTextInput testID="passwordField" name="password" placeholder="Password" style={styles.textInput} />
      <FormikTextInput testID="passwordConfirmationField" name="passwordConfirmation" placeholder="Password Confirmation" style={styles.textInput} />
      <TouchableWithoutFeedback onPress={onSubmit} >
        <View testID="submitButton" style={styles.loginButton}>
          <Text style={styles.loginButtonText} >Create account</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [ signUp ] = useCreateUser();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signUp({username, password});
      if (data) history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;