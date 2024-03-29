import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/login';
import Signup from '../screens/auth/signup';
import ChooseAuth from '../screens/auth/chooseAuth';
import {ROUTES} from '.';

const Stack = createNativeStackNavigator();

function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.AUTH_WELCOME} component={ChooseAuth} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.SIGNUP} component={Signup} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
