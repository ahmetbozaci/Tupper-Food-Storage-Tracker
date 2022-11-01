import React from 'react';
import {
  TextInput,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import styles from '../styles';
import validationSchema from './validationSchema';
import CustomButton from '../../../shared/Button';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../features/store';
import COLORS from '../../../color';
import AuthHeader from '../../../shared/AuthHeader';
import {heightPercentage} from '../../../config';
import {userSignUp} from '../../../api/auth';
import {showMessage} from 'react-native-flash-message';
import {SignupData} from '../../../interfaces/Auth';

interface Props {
  navigation: any;
}

const SignupForm: React.FC<Props> = ({navigation}) => {
  const loading = useAppSelector((state: RootState) => state.signup.loading);
  const dispatch = useAppDispatch();

  const initialValues = {
    name: '',
    email: '',
    zipCode: '',
    password: '',
    passwordConfirmation: '',
  };

  const signup = async (values: SignupData) => {
    const data: any = await dispatch(userSignUp(values));
    if (data?.payload.status === 'fail') {
      showMessage({
        message: 'Error',
        description: data.payload.message,
        type: 'danger',
      });
    } else if (data?.payload.status === 'success') {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <AuthHeader navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <Text style={[styles.titleTextSignup, styles.titleText]}>
            Sign Up
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => {
              signup(values);
            }}>
            {({values, handleChange, errors, touched, handleSubmit}) => (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor={COLORS.gray8}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  keyboardType="name-phone-pad"
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={COLORS.gray8}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Zip Code"
                  placeholderTextColor={COLORS.gray8}
                  onChangeText={handleChange('zipCode')}
                  value={values.zipCode}
                  keyboardType="number-pad"
                />
                {touched.zipCode && errors.zipCode && (
                  <Text style={styles.errorText}>{errors.zipCode}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={COLORS.gray8}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholderTextColor={COLORS.gray8}
                  placeholder="Confirm Password"
                  onChangeText={handleChange('passwordConfirmation')}
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
                {touched.passwordConfirmation &&
                  errors.passwordConfirmation && (
                    <Text style={styles.errorText}>
                      {errors.passwordConfirmation}
                    </Text>
                  )}
                <CustomButton
                  loading={loading}
                  onPress={() => {
                    handleSubmit();
                  }}
                  buttonStyle={[
                    styles.button,
                    {marginTop: heightPercentage(10)},
                  ]}
                  buttonTextStyle={styles.btnText}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupForm;
