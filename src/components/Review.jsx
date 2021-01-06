import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { useHistory, useParams } from "react-router-dom";
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

import theme from '../theme';

import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  submitButton: {
    backgroundColor: theme.colors.tertiary,
    margin: 25,
    height: 40,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  submitButtonText: {
    color: theme.colors.textTertiary,
  },
  textInput: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    width: 250,
    borderRadius: 10,
    padding: 10,
  },
  review:{
    height: 100
  }
};

const ratingMustBe = "Rating must be an integer between 0 and 100";
const isRequired = " is required";
const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .typeError(`Repository owner${isRequired}`)
    .required(`Repository owner${isRequired}`),
  repositoryName: yup
    .string()
    .typeError(`Repository${isRequired}`)
    .required(`Repository${isRequired}`),
  rating: yup
    .number()
    .integer(ratingMustBe)
    .min(0, ratingMustBe)
    .max(100, ratingMustBe)
    .typeError(ratingMustBe)
    .required(`Rating${isRequired}`),
  text: yup
    .string()
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput testID="ownerNameField" name="ownerName" placeholder="Repository owner" style={styles.textInput} />
      <FormikTextInput testID="repositoryNameField" name="repositoryName" placeholder="Repository Name" style={styles.textInput} />
      <FormikTextInput testID="ratingField" name="rating" placeholder="Rating" style={styles.textInput} />
      <FormikTextInput testID="textField" name="text" placeholder="Review" style={[ styles.textInput, styles.review ]} multiline />
      <TouchableWithoutFeedback onPress={onSubmit} >
        <View testID="submitButton" style={styles.submitButton}>
          <Text style={styles.submitButtonText} >Submit</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const ReviewContainer = ({ onSubmit, id }) => {
  const [ ownerName, repositoryName ] = id ? id.split('.') : [ '', '' ];
  return (
    <Formik initialValues={{ ...initialValues, ownerName, repositoryName }} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const Review = () => {
  const { id } = useParams();
  const history = useHistory();
  const [ createReview ] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const data = await createReview({ variables: { review: { ownerName, repositoryName, text, rating: new Number(rating) }}});
      if (data?.createReview) history.push(`/repo/${data.createReview?.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ReviewContainer onSubmit={onSubmit} id={id} />
  );
};

export default Review;