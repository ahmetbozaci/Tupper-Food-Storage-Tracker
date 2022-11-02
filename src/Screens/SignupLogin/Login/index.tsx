import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {Formik} from 'formik';
import styles from '../styles';
import validationSchema from './validationSchema';
import CustomButton from '../../../shared/Button';
import {showMessage} from 'react-native-flash-message';
import {heightPercentage} from '../../../config';
import AuthHeader from '../../../shared/AuthHeader';
import {userLogin} from '../../../api/auth';
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from '../../../features/store';
import {login as loginReducer} from '../../../features/loginSlice';
import {LoginData} from '../../../interfaces/Auth';
import COLORS from '../../../color';
import EyeClose from '../../../../assets/svg/eye-close.svg';
import EyeOpen from '../../../../assets/svg/eye-open.svg';
import {useTogglePasswordVisibility} from '../hooks/useTogglePasswordVisibility';

interface Props {
  navigation: any;
}

const LoginForm: React.FC<Props> = ({navigation}) => {
  const loading = useAppSelector((state: RootState) => state.auth.loading);
  const {passwordVisibility, hideShowPassword} = useTogglePasswordVisibility();
  const initialValues = {
    email: '',
    password: '',
  };

  const dispatch = useAppDispatch();
  const login = async (values: LoginData) => {
    const data: any = await dispatch(userLogin(values));
    if (data?.payload.status === 'fail') {
      showMessage({
        message: 'Error',
        description: data.payload.message,
        type: 'danger',
      });
    } else if (data?.payload.status === 'success') {
      dispatch(
        loginReducer({token: data.payload.token, user: data.payload.data}),
      );
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <AuthHeader
        navigation={navigation}
        onPress={() => navigation.navigate('Main')}
      />
      <View style={styles.content}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={[styles.titleTextLogin, styles.titleText]}>
              Log In
            </Text>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={values => {
                login(values);
              }}>
              {({values, handleChange, errors, touched, handleSubmit}) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    autoCapitalize="none"
                    placeholderTextColor={COLORS.gray8}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      onChangeText={handleChange('password')}
                      value={values.password}
                      secureTextEntry={passwordVisibility}
                      autoCapitalize="none"
                      placeholderTextColor={COLORS.gray8}
                    />
                    <Pressable onPress={hideShowPassword}>
                      {passwordVisibility ? (
                        <EyeOpen style={styles.eye} />
                      ) : (
                        <EyeClose style={styles.eye} />
                      )}
                    </Pressable>
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                  <CustomButton
                    onPress={() => {
                      handleSubmit();
                    }}
                    loading={loading}
                    buttonStyle={[
                      styles.button,
                      {marginTop: heightPercentage(175)},
                    ]}
                    buttonTextStyle={styles.btnText}
                  />
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;
