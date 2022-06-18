import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Logo } from '../assets';
import Button from '../components/Button';
import Screen from '../components/Screen';
import colors from '../config/colors';
import { RootStackProps } from '../types';

type Props = NativeStackScreenProps<RootStackProps, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <Screen style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
        <Text style={styles.tagline}>E-Commerce Sample App</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title='Login' onPress={() => navigation.navigate('Login')} />
        <Button
          title='Register'
          color={colors.white}
          textColor='dark'
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.bg,
  },
  logoContainer: {
    position: 'absolute',
    top: 100,
  },
  logo: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  tagline: {
    fontSize: 30,
    fontWeight: '600',
    marginTop: 50,
    color: colors.white,
  },
});
