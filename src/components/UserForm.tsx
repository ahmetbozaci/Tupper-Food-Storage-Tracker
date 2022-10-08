/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet, Button, TextInput, View, Text} from 'react-native';
import {globalStyles} from './globalStyles';
import {Formik} from 'formik';

const UserForm = () => {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={values => {
          console.log(values);
        }}>
        {({values, handleChange, handleSubmit}) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Enter username"
              onChangeText={handleChange('name')}
              value={values.name}
            />
            <TextInput
              style={globalStyles.input}
              multiline
              placeholder="Enter email"
              onChangeText={handleChange('email')}
              value={values.email}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              value={values.password}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="Password Confirmation"
              onChangeText={handleChange('passwordConfirmation')}
              value={values.passwordConfirmation}
            />
            <Button color="maroon" title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default UserForm;
