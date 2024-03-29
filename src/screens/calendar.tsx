import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  ErrorView,
  LoaderView,
  ScreenHeaderBg,
  ScreenHeaderText,
  SectionHeader,
} from '../components';
import BookingCard from './bookings/bookingCard';
import {Calendar} from 'react-native-calendars';
import {Colors} from '../constants';
import {useAppContext} from '../context';
import {getUpcomingBookings} from '../utils/apiRequests';
import {useQuery} from '@tanstack/react-query';
import {MarkedDates} from 'react-native-calendars/src/types';

export default function CalendarView() {
  const {theme, token} = useAppContext();
  const styles = styleSheet({theme});
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const {data: bookings, status} = useQuery({
    queryKey: ['upcomingBookings'],
    queryFn: () => getUpcomingBookings(token),
    onSuccess: res => {
      const dates = res.map(booking => {
        const date = new Date(booking.createdAt);
        return (
          date.getFullYear() +
          '-' +
          padTo2Digits(date.getMonth() + 1) +
          '-' +
          padTo2Digits(date.getDate())
        );
      });

      const todaysDate = new Date();
      const formattedTodaysDate =
        todaysDate.getFullYear() +
        '-' +
        padTo2Digits(todaysDate.getMonth() + 1) +
        '-' +
        padTo2Digits(todaysDate.getDate());

      const formattedDates: MarkedDates = {};
      const options = {
        selected: true,
        selectedColor: theme === 'dark' ? Colors.blue : Colors.darkBlue,
      };

      for (const d of dates) {
        formattedDates[d] = {...options};
      }
      formattedDates[formattedTodaysDate] = {
        marked: true,
      };

      setMarkedDates(formattedDates);
    },
  });

  return (
    <View style={styles.wrapper}>
      <ScreenHeaderBg>
        <ScreenHeaderText title="Calendar" />
      </ScreenHeaderBg>

      {status === 'loading' && <LoaderView />}
      {status === 'error' && <ErrorView />}
      {status === 'success' && (
        <View style={styles.main}>
          <FlatList
            contentContainerStyle={styles.flatlist}
            data={bookings}
            ListHeaderComponent={() => (
              <>
                <View style={styles.calendarContainer}>
                  <Calendar
                    style={styles.calendar}
                    theme={{
                      arrowColor:
                        theme === 'dark' ? Colors.blue : Colors.darkBlue,
                      dotColor: 'red',
                      indicatorColor:
                        theme === 'dark' ? Colors.blue : Colors.darkBlue,
                      todayTextColor:
                        theme === 'dark' ? Colors.blue : Colors.darkBlue,
                      textMonthFontWeight: '600',
                      textDayFontSize: 14,
                    }}
                    markedDates={markedDates}
                  />
                </View>
                <SectionHeader
                  withPaddingHorizontal={false}
                  title="Booked Services"
                />
              </>
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.flatlistSeparator} />
            )}
            renderItem={({item}) => <BookingCard data={item} />}
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
    calendarContainer: {
      marginBottom: 24,
      shadowOffset: {
        height: 1,
        width: 1,
      },
      shadowOpacity: 0.2,
      elevation: 3,
    },
    calendar: {
      borderRadius: 24,
      overflow: 'hidden',
      // borderColor: '#333',
      // borderWidth: theme === 'dark' ? 1 : 0,
    },
    flatlist: {
      paddingHorizontal: 24,
      paddingBottom: 30,
    },
    flatlistSeparator: {
      height: 20,
    },
  });
