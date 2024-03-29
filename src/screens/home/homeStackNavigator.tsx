import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AvailableHandymen, Details, HandymanReviews, Home} from '..';
import {Platform} from 'react-native';
import {ROUTES} from '../../navigation';

const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTES.DETAILS}
        component={Details}
        options={{
          headerShown: false,
          presentation: Platform.OS === 'ios' ? 'modal' : 'card',
        }}
      />
      <Stack.Screen
        name={ROUTES.AVAILABLE_HANDYMEN}
        component={AvailableHandymen}
        options={{
          headerTitle: 'Available',
        }}
      />
      <Stack.Screen
        name={ROUTES.HANDYMAN_REVIEWS}
        component={HandymanReviews}
        options={{
          headerTitle: 'Reviews',
          presentation: Platform.OS === 'ios' ? 'modal' : 'card',
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
