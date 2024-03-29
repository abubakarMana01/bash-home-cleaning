import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  ErrorView,
  LoaderView,
  ScreenHeaderBg,
  ScreenHeaderText,
} from '../../components';
import BookingCard from './bookingCard';
import {useAppContext} from '../../context';
import {useQuery} from '@tanstack/react-query';
import {getAllBookings} from '../../utils/apiRequests';

export default function Bookings() {
  const {theme, token} = useAppContext();
  const styles = styleSheet({theme});

  const {data: bookings, status} = useQuery({
    queryKey: ['allBookings'],
    queryFn: () => getAllBookings(token),
  });

  return (
    <View style={styles.wrapper}>
      <ScreenHeaderBg>
        <ScreenHeaderText title="Bookings" />
      </ScreenHeaderBg>

      {status === 'loading' && <LoaderView />}
      {status === 'error' && <ErrorView />}
      {status === 'success' && (
        <View style={styles.main}>
          <FlatList
            contentContainerStyle={styles.flatlist}
            data={bookings}
            ItemSeparatorComponent={() => (
              <View style={styles.flatlistSeparator} />
            )}
            renderItem={({item}) => <BookingCard data={item} showDropdown />}
          />
        </View>
      )}
    </View>
  );
}

const styleSheet = ({}: IStyleSheet) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    main: {
      marginTop: -35,
      flex: 1,
    },
    flatlist: {
      paddingHorizontal: 24,
      paddingBottom: 30,
    },
    flatlistSeparator: {
      height: 20,
    },
  });
