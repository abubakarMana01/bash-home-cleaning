import {
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useAppContext} from '../../context';
import {Colors} from '../../constants';
import {AppButton, Divider, GoBackButton} from '../../components';
import {ROUTES} from '../../navigation';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default function BookingDetails() {
  const {theme} = useAppContext();
  const styles = styleSheet({theme});
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();

  const {service, worker, status} = route.params as {
    worker: IHandyMan;
    status: 'completed' | 'cancelled' | 'upcoming';
    service: IService;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && (
          <StatusBar
            barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          />
        )}

        <ImageBackground
          style={styles.imageBackground}
          source={{
            uri: service.picture,
          }}>
          <SafeAreaView style={{marginLeft: 16, marginTop: 16}}>
            <GoBackButton />
          </SafeAreaView>
        </ImageBackground>

        <View style={styles.main}>
          <ScrollView bounces={true} showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, paddingTop: 16}}>
              <Text style={styles.title} numberOfLines={2}>
                {service.title}
              </Text>
              <Text style={styles.handymanName}>
                {worker.firstName} {worker.lastName}
              </Text>
            </View>

            <View style={styles.statusAndPriceContainer}>
              <View
                style={[
                  styles.statusContainer,
                  {
                    backgroundColor:
                      status === 'completed'
                        ? styles.completedStatus.backgroundColor
                        : status === 'cancelled'
                        ? styles.cancelledStatus.backgroundColor
                        : styles.upcomingStatus.backgroundColor,
                  },
                ]}>
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        status === 'completed'
                          ? styles.completedStatus.color
                          : status === 'cancelled'
                          ? styles.cancelledStatus.color
                          : styles.upcomingStatus.color,
                    },
                  ]}>
                  {status}
                </Text>
              </View>
              <View>
                <Text style={styles.price}>
                  ₦{worker.chargePerHour}
                  <Text style={styles.perHour}>/hr</Text>
                </Text>
              </View>
            </View>

            <View style={styles.separator}>
              <Divider
                color={theme === 'dark' ? Colors.lightGrey : Colors.grey + '70'}
              />
            </View>

            <View>
              <Text style={styles.descriptionTitle}>About Service</Text>
              <Text style={styles.descriptionText}>
                {worker.serviceOffered.description}
              </Text>
            </View>
          </ScrollView>

          <AppButton
            title="Write a review"
            onPress={() =>
              navigation.navigate(ROUTES.WRITE_BOOKING_REVIEW, {
                workerId: worker._id,
              })
            }
            full
            customStyles={{marginTop: 8}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styleSheet = ({theme}: IStyleSheet) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    imageBackground: {
      flex: Dimensions.get('window').height < 700 ? 0.5 : 0.6,
      backgroundColor: theme === 'dark' ? Colors.darkGrey : Colors.lightGrey,
    },
    main: {
      flex: Dimensions.get('window').height < 700 ? 0.5 : 0.4,
      padding: 16,
      paddingTop: 0,
    },
    statusAndPriceContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    separator: {
      paddingVertical: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    handymanName: {
      fontSize: 16,
      marginTop: 2,
      color: theme === 'dark' ? Colors.grey : Colors.darkGrey,
      textTransform: 'capitalize',
    },
    price: {
      fontSize: 30,
      fontWeight: '600',
      color: theme === 'dark' ? Colors.blue : Colors.darkBlue,
    },
    perHour: {
      fontSize: 14,
      color: theme === 'dark' ? Colors.grey : Colors.darkGrey,
    },
    descriptionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    descriptionText: {
      color: theme === 'dark' ? Colors.grey : Colors.darkGrey,
      marginTop: 8,
      paddingBottom: 12,
    },
    statusContainer: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 8,
      alignSelf: 'flex-start',
      marginTop: 8,
    },
    statusText: {
      textTransform: 'capitalize',
      fontWeight: '500',
      fontSize: 12,
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
  });
