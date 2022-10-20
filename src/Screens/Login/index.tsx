import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {Formik} from 'formik';
import styles from '../loginSignupStyles';
import validationSchema from './validationSchema';
import CustomButton from '../../shared/Button';
import {showMessage} from 'react-native-flash-message';
import {heightPercentage} from '../../config';
import AuthHeader from '../../shared/AuthHeader';
import {userLogin} from '../../api/auth';
import {useAppDispatch, useAppSelector, RootState} from '../../features/store';
import {login as loginReducer} from '../../features/loginSlice';
import {LoginData} from '../../interfaces/Auth';
// import { selectAuthState } from '../../features/authSlice';

interface Props {
  navigation: any;
}

const LoginForm: React.FC<Props> = ({navigation}) => {
  const loading = useAppSelector((state: RootState) => state.auth.loading);

  //email //omodauda@yahoo.com
  //password //testing

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
      <AuthHeader navigation={navigation} />
      <View style={styles.content}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={[styles.titleTextLogin, styles.titleText]}>
              Log In
            </Text>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                login(values);
                actions.resetForm();
              }}>
              {({values, handleChange, errors, touched, handleSubmit}) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    // name="email"
                    autoCapitalize="none"
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    value={values.password}
                    // name="password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
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
