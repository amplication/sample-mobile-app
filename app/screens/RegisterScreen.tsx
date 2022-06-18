import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';

import { Logo } from '../assets';
import ErrorMessage from '../components/ErrorMessage';
import { Form, FormField } from '../components/forms';
import Screen from '../components/Screen';
import SubmitButton from '../components/SubmitButton';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(8).required().label('Password'),
});

export default function RegisterScreen() {
  const [error, setError] = useState('');

  const handleSubmit = async (userInfo: any) =>
    Promise.resolve(console.log('submit'));

  return (
    <>
      <Screen style={styles.screen}>
        <Logo style={styles.logo} />
        <Form
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon='account'
            name='name'
            placeholder='Name'
            textContentType='name'
          />
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
          <SubmitButton title='Register' />
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
    width: '100%',
    height: '100%',
    marginTop: 50,
    marginBottom: 90,
    alignSelf: 'center',
  },
});
