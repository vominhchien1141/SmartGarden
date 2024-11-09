import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';


const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
} 

export default LoginNavigation;
