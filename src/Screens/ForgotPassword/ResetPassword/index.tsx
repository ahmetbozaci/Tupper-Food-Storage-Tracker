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
import {useAppDispatch} from '../../../features/store';
import {resetPasswordFetch} from '../../../features/resetPasswordSlice';

interface UserInformation {
  password: string;
  email: string;
  otp: string;
}

interface Props {
  navigation: any;
  route: any;
}

const ResetPassword: React.FC<Props> = ({route, navigation}) => {
  const {email, otp} = route.params;
  const initialValues = {
    password: '',
    passwordConfirmation: '',
  };
  const dispatch = useAppDispatch();
  const navigateToVerifyCodeScreen = (data: string) => {
    if (data === 'success') {
      navigation.navigate('Login');
    }
  };

  const resetPassword = async (values: UserInformation) => {
    const {password} = values;
    const data = await dispatch(
      resetPasswordFetch({
        password,
        email,
        otp,
      }),
    );
    navigateToVerifyCodeScreen(data.payload.status);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        resetPassword({
          password: values.password,
          email: route.email,
          otp: route.code,
        });
        actions.resetForm();
      }}>
      {({values, handleChange, errors, touched, handleSubmit}) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={[styles.titleTextSignup, styles.titleText]}>
              Reset Password.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor={COLORS.gray8}
              onChangeText={handleChange('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.gray8}
              placeholder="Confirm Password"
              onChangeText={handleChange('passwordConfirmation')}
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <Text style={styles.errorText}>
                {errors.passwordConfirmation}
              </Text>
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

export default ResetPassword;
