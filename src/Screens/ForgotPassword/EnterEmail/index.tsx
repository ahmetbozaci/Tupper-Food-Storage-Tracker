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
import {forgotPasswordFetch} from '../../../features/forgotPasswordSlice';

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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        enterEmail(values);
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
