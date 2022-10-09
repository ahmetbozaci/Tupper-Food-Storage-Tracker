/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {Button, TextInput, View, Text} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styles from './styles';

const UserForm = () => {
  const [userInformation, setUserInformation] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  return (
    <View>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          agree: false,
        }}
        //! object().shape() or only object() ????
        validationSchema={Yup.object({
          name: Yup.string().required('Please, provide your name'),
          email: Yup.string().email().required('Please provide your email'),
          password: Yup.string()
            .min(8, 'Password should minimum 8 characters.')
            .required(),
          passwordConfirmation: Yup.string().when('password', {
            is: (val: string | any[]) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref('password')],
              'Both password need to be the same',
            ),
          }),
        })}
        onSubmit={values => {
          setUserInformation(values);
          console.log('hello');
        }}>
        {({values, handleChange, handleSubmit, dirty, errors, touched}) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              onChangeText={handleChange('name')}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.name}
              </Text>
            )}
            <TextInput
              style={styles.input}
              multiline
              placeholder="Enter email"
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.email}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.password}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password Confirmation"
              onChangeText={handleChange('passwordConfirmation')}
              value={values.passwordConfirmation}
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.passwordConfirmation}
              </Text>
            )}
            <Button
              color="maroon"
              title="Submit"
              onPress={handleSubmit}
              disabled={!dirty}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default UserForm;
