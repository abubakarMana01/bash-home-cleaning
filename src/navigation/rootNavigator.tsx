import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import useNavigationTheme from './useNavigationTheme';
import BottomTabsNavigation from './bottomTabsNavigation';
import AuthStackNavigator from './authStackNavigator';
import {useAppContext} from '../context';
import {SafeAreaView} from 'react-native';

export default function RootNavigator() {
  const navigationTheme = useNavigationTheme();
  const {token} = useAppContext();

  return (
    <NavigationContainer theme={navigationTheme}>
      {token ? (
        <SafeAreaView style={{flex: 1}}>
          <BottomTabsNavigation />
        </SafeAreaView>
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
}
