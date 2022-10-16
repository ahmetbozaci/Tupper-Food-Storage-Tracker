import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import styles from './styles';
import validationSchema from './validationSchema';
import CustomButton from '../../../shared/Button';
import COLORS from '../../../color';

const EnterEmail = () => {
  const initialValues = {
    email: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
      }}>
      {({values, handleChange, errors, touched, handleSubmit}) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={[styles.titleTextSignup, styles.titleText]}>
              A verification will be sent to your email.
            </Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Email"
              placeholderTextColor={COLORS.gray8}
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <View
              style={[styles.buttonContainer, styles.buttonContainerSignup]}>
              <CustomButton
                onPress={() => {
                  handleSubmit();
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

export default EnterEmail;
