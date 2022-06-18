import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';

import { Logo } from '../assets';
import { Form, FormField } from '../components/forms';
import Screen from '../components/Screen';
import SubmitButton from '../components/SubmitButton';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(8).required().label('Password'),
});

export default function LoginScreen() {
  const handleSubmit = () => Promise.resolve(console.log('submit'));

  return (
    <>
      <Screen style={styles.screen}>
        <Logo style={styles.logo} />
        <Form
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='email'
            keyboardType='email-address'
            name='email'
            placeholder='Email'
            textContentType='emailAddress'
          />
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='lock'
            name='password'
            placeholder='Password'
            secureTextEntry
            textContentType='password'
          />
          <SubmitButton title='Login' />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.bg,
  },
  logo: {
    width: 90,
    height: 90,
    marginTop: 50,
    marginBottom: 90,
    alignSelf: 'center',
  },
});
