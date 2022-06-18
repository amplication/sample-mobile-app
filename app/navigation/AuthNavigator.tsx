import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../config/colors';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTransparent: true,
      headerTitleAlign: 'center',
      headerTintColor: colors.white,
      title: '',
    }}
  >
    <Stack.Screen
      name='Welcome'
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name='Login' component={LoginScreen} options={{}} />
    <Stack.Screen name='Register' component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
