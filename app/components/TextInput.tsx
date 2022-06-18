import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import defaultStyles from '../config/defaultStyles';

export default function AppTextInput({
  icon = 'home',
  width = '100%',
  ...props
}) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          style={styles.icon}
          name={icon}
          size={25}
          color={colors.medium}
        />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={[defaultStyles.text, { width: '100%' }]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
});
