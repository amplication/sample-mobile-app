import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import theme from './app/navigation/theme';

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}
