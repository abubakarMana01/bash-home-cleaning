import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants';
import {useAppContext} from '../../context';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {ROUTES} from '../../navigation';

interface IBookingCard {
  data: IBooking;
  showDropdown?: boolean;
}

export default function BookingCard({data}: IBookingCard) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const {theme} = useAppContext();
  const styles = styleSheet({theme});

  return (
    <TouchableOpacity
      activeOpacity={route.name === ROUTES.CALENDAR ? 1 : 0.1}
      onPress={() => {
        if (route.name === ROUTES.CALENDAR) {
          return;
        }
        navigation.navigate(ROUTES.ABOUT_BOOKING, {
          service: data.service,
          worker: data.worker,
          status: data.status,
        });
      }}
      style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={{uri: data.service.picture}} style={styles.image} />

        <View style={{flex: 1}}>
          <Text numberOfLines={2} style={styles.title}>
            {data.service.title}
          </Text>
          <Text style={styles.date}>
            {new Date(data.createdAt).toLocaleDateString()}
          </Text>

          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  data.status === 'completed'
                    ? styles.completedStatus.backgroundColor
                    : data.status === 'cancelled'
                    ? styles.cancelledStatus.backgroundColor
                    : styles.upcomingStatus.backgroundColor,
              },
            ]}>
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    data.status === 'completed'
                      ? styles.completedStatus.color
                      : data.status === 'cancelled'
                      ? styles.cancelledStatus.color
                      : styles.upcomingStatus.color,
                },
              ]}>
              {data.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styleSheet = ({theme}: IStyleSheet) =>
  StyleSheet.create({
    container: {
      // backgroundColor: theme === 'dark' ? #121212 : Colors.white,
      backgroundColor: theme === 'dark' ? Colors.dark : Colors.white,
      borderRadius: 16,
      shadowOffset: {
        height: 1,
        width: 1,
      },
      shadowOpacity: 0.2,
      borderColor: '#333',
      elevation: 3,
      borderWidth: theme === 'dark' ? 1 : 0,
      flexDirection: 'row',
    },
    infoContainer: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    date: {
      marginTop: 3,
      marginBottom: 10,
      color: theme === 'dark' ? Colors.white : Colors.black,
      opacity: 0.7,
      fontSize: 12,
    },
    statusContainer: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    statusText: {
      textTransform: 'capitalize',
      fontWeight: '500',
    },
    upcomingStatus: {
      backgroundColor: theme === 'dark' ? '#1343ED' : '#1343ED30',
      color: theme === 'dark' ? Colors.lightGrey : '#1343ED',
    },
    completedStatus: {
      backgroundColor: theme === 'dark' ? '#00834c' : '#00A66030',
      color: theme === 'dark' ? Colors.lightGrey : '#028a52',
    },
    cancelledStatus: {
      backgroundColor: theme === 'dark' ? '#ED1313' : '#ED131320',
      color: theme === 'dark' ? Colors.lightGrey : '#ED1313',
    },
    // dropArea: {
    //   borderLeftWidth: 1,
    //   borderColor: theme === 'dark' ? '#333' : Colors.lightGrey,
    //   padding: 8,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
  });
