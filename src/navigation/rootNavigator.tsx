import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import useNavigationTheme from './useNavigationTheme';
import BottomTabsNavigation from './bottomTabsNavigation';
import AuthStackNavigator from './authStackNavigator';
import {useAppContext} from '../context';

export default function RootNavigator() {
  const navigationTheme = useNavigationTheme();
  const {token} = useAppContext();

  return (
    <NavigationContainer theme={navigationTheme}>
      {token ? <BottomTabsNavigation /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
