import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useHistory } from "react-router-dom";
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

import theme from '../theme';

import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
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
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(10, 'Maximum character count is 10')
    .required('Username is required'),
  password: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(10, 'Maximum character count is 10')
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.textInput} />
      <FormikTextInput name="password" placeholder="Password" style={styles.textInput} secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit} >
        <View style={styles.loginButton}>
          <Text style={{ color: theme.colors.textTertiary }} >Login</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const history = useHistory();
  const [ signIn ] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ variables: { credentials: { username, password }}});
      if (data) history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;