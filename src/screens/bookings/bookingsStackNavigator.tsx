import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BookingDetails, Bookings, WriteBookingReview} from '..';
import {Platform} from 'react-native';
import {ROUTES} from '../../navigation';

const Stack = createNativeStackNavigator();

function BookingsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.BOOKINGS} component={Bookings} />
      <Stack.Screen
        name={ROUTES.ABOUT_BOOKING}
        component={BookingDetails}
        options={
          {
            // presentation: Platform.OS === 'ios' ? 'modal' : 'card',
          }
        }
      />
      <Stack.Screen
        name={ROUTES.WRITE_BOOKING_REVIEW}
        component={WriteBookingReview}
        options={{
          headerShown: true,
          headerTitle: 'Give Feedback',
          presentation: Platform.OS === 'ios' ? 'modal' : 'card',
        }}
      />
    </Stack.Navigator>
  );
}

export default BookingsStackNavigator;
