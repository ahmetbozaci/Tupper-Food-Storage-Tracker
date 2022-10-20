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
import styles from './styles';
import validationSchema from './validationSchema';
import CustomButton from '../../../shared/Button';
import COLORS from '../../../color';
import {useAppDispatch} from '../../../features/store';
import {forgotPasswordFetch} from '../../../features/forgotPasswordSlice';
import AuthHeader from '../../../shared/AuthHeader';

interface Email {
  email: string;
}
interface Props {
  navigation: any;
}
const EnterEmail: React.FC<Props> = ({navigation}) => {
  const initialValues = {
    email: '',
  };
  const dispatch = useAppDispatch();

  const navigateToVerifyCodeScreen = (data: string, email: string) => {
    if (data === 'success') {
      navigation.navigate('VerifyCode', {email: email});
    }
  };

  const enterEmail = async (values: Email) => {
    const data = await dispatch(forgotPasswordFetch(values));
    navigateToVerifyCodeScreen(data.payload.status, values.email);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <AuthHeader navigation={navigation} />
      <View style={styles.content}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={[styles.titleTextSignup, styles.titleText]}>
              A verification code will be sent to your email.
            </Text>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                enterEmail(values);
                actions.resetForm();
              }}>
              {({values, handleChange, errors, touched, handleSubmit}) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={COLORS.gray8}
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <CustomButton
                    onPress={() => {
                      handleSubmit();
                    }}
                    buttonStyle={styles.button}
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

export default EnterEmail;
