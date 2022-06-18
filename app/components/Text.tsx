import React from 'react';
import { Text as RNText } from 'react-native';

import defaultStyles from '../config/defaultStyles';
import colors from '../config/colors';

type Props = {
  children: React.ReactNode;
  style?: { [key: string]: any };
  numberOfLines?: number;
};

const Text: React.FC<Props> = ({ children, style, numberOfLines }) => {
  return (
    <RNText
      placeholderTextColor={colors.medium}
      style={[defaultStyles.text, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};
export default Text;
