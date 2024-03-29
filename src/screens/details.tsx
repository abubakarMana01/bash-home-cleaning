import React, {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppButton, Avatar, Divider, GoBackButton} from '../components';
import {Colors} from '../constants';
import {useAppContext} from '../context';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ROUTES} from '../navigation';
import {addNewBooking} from '../utils/apiRequests';

export default function Details() {
  const {theme, token} = useAppContext();
  const styles = styleSheet({theme});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {
    params: {data, serviceId},
  } = useRoute() as {params: {data: IHandyMan; serviceId: string}};

  const initials = (data.firstName + ' ' + data.lastName)
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  const handleAddBooking = async () => {
    setIsLoading(true);
    try {
      await addNewBooking(token, {
        serviceId: serviceId,
        workerId: data._id,
      });
      Alert.alert('Success', 'The service has been booked successfully');
      navigation.popToTop();
    } catch (ex: any) {
      console.log(ex.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:${' + '09033889352' + '}';
    } else {
      number = 'tel:${' + '09033889352' + '}';
    }
    Linking.openURL(number);
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <StatusBar barStyle={'light-content'} backgroundColor={Colors.dark} />
      )}

      <ImageBackground
        source={{uri: data.serviceOffered.service.picture}}
        style={styles.imageBackground}
        resizeMode="cover">
        <SafeAreaView style={{marginLeft: 16}}>
          <GoBackButton />
        </SafeAreaView>
      </ImageBackground>

      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.main}>
            <View style={styles.header}>
              <Text style={styles.title} numberOfLines={1}>
                {data.serviceOffered.service.title}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ROUTES.HANDYMAN_REVIEWS, {
                    workerId: data._id,
                  })
                }>
                <Text style={styles.reviewsButton}>View reviews</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
              {/* <Image
                source={require('../assets/user2.png')}
                resizeMode="cover"
                style={styles.userImg}
              /> */}

              <Avatar initials={initials} size={43} />

              <View style={{marginLeft: 10}}>
                <Text style={styles.username}>
                  {data.firstName} {data.lastName}
                </Text>
                <View style={styles.userRatingContainer}>
                  <MaterialCommunityIcons
                    name="star"
                    color="#E38902"
                    size={18}
                  />
                  <Text style={styles.ratingText}>
                    {(
                      data.ratings.overallRatings / data.ratings.count || 0
                    ).toFixed(1)}{' '}
                    /{' '}
                    <Text style={styles.ratingCount}>
                      ({data.ratings.count} reviews)
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoIconContainer}>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color={Colors.darkGrey}
                />
              </View>

              <Text style={styles.location}>{data.location.address}</Text>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoIconContainer}>
                <Ionicons
                  name="pricetag-outline"
                  size={20}
                  color={Colors.darkGrey}
                />
              </View>

              <Text style={styles.price}>
                ₦{data.chargePerHour}
                <Text style={styles.perHour}>/hr</Text>
              </Text>
            </View>

            <View style={styles.dividerContainer}>
              <Divider
                color={theme === 'dark' ? Colors.lightGrey : Colors.grey + '70'}
              />
            </View>

            <View>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                {data.serviceOffered.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <SafeAreaView>
        <Divider
          color={theme === 'dark' ? Colors.lightGrey : Colors.grey + '70'}
        />
        <View style={styles.actionButtonsContainer}>
          <View style={styles.actionButton}>
            <AppButton
              title="Contact"
              onPress={() => openDialScreen()}
              full
              customStyles={styles.messageButton}
              customTextStyles={styles.messageButtonText}
            />
          </View>
          <View style={styles.actionButton}>
            <AppButton
              title="Book now"
              onPress={handleAddBooking}
              full
              isLoading={isLoading}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styleSheet = ({theme}: IStyleSheet) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    imageBackground: {
      width: '100%',
      height: Dimensions.get('window').height / 3.5,
      maxHeight: 260,
      paddingTop: 16,
      overflow: 'hidden',
      backgroundColor: theme === 'dark' ? Colors.darkGrey : Colors.lightGrey,
    },
    main: {
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    reviewsButton: {
      color: theme === 'dark' ? Colors.blue : Colors.darkBlue,
      fontWeight: '500',
      marginLeft: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: '600',
      color: theme === 'dark' ? Colors.white : Colors.black,
      flex: 1,
    },
    infoContainer: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    // userImg: {
    //   width: 43,
    //   height: 43,
    //   borderRadius: 21.5,
    //   marginRight: 10,
    // },
    username: {
      fontWeight: '600',
      fontSize: 18,
      color: theme === 'dark' ? Colors.white : Colors.black,
      textTransform: 'capitalize',
    },
    userRatingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 3,
    },
    ratingText: {
      marginLeft: 4,
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    ratingCount: {
      color: theme === 'dark' ? Colors.grey : Colors.darkGrey,
    },
    infoIconContainer: {
      backgroundColor: Colors.lightGrey,
      width: 43,
      height: 43,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    location: {
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    price: {
      fontSize: 32,
      fontWeight: '600',
      color: theme === 'dark' ? Colors.blue : Colors.darkBlue,
    },
    perHour: {
      fontSize: 14,
      color: theme === 'dark' ? Colors.grey : Colors.darkGrey,
    },
    dividerContainer: {
      paddingVertical: 25,
    },

    descriptionTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 8,
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    descriptionText: {
      color: theme === 'dark' ? Colors.grey : Colors.darkGrey,
    },

    actionButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom:
        Platform.OS === 'android'
          ? 12
          : Dimensions.get('window').height < 700
          ? 12
          : 0,
    },
    actionButton: {
      flex: 0.47,
    },
    messageButton: {
      backgroundColor: '#d8e2ff',
    },
    messageButtonText: {
      color: Colors.darkBlue,
    },
  });
