import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../constants';
import {Avatar} from '../../../components';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppContext} from '../../../context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ROUTES} from '../../../navigation';

interface IHandymanItem {
  data: IHandyMan;
  serviceId: string;
}

export default function HandymanItem({data, serviceId}: IHandymanItem) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {theme} = useAppContext();
  const styles = styleSheet({theme});

  const initials = (data.firstName + ' ' + data.lastName)
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ROUTES.DETAILS, {data, serviceId})}>
      <View style={styles.infoContainer}>
        {/* <Image
        source={{uri: data.picture}}
        resizeMode="cover"
        style={styles.userImg}
      /> */}

        <Avatar size={55} initials={initials} />

        <View style={styles.userDetails}>
          <Text style={styles.username} numberOfLines={1}>
            {data.firstName} {data.lastName}
          </Text>
          <View style={styles.userRatingContainer}>
            <MaterialCommunityIcons name="star" color="#E38902" size={18} />
            <Text style={styles.ratingText}>
              {(+data.ratings.overallRatings / data.ratings.count || 0).toFixed(
                1,
              )}{' '}
              <Text style={styles.ratingCount}>
                ({data.ratings.count} reviews)
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styleSheet = ({theme}: IStyleSheet) =>
  StyleSheet.create({
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    reviewsButton: {
      color: theme === 'dark' ? Colors.blue : Colors.darkBlue,
      fontWeight: '500',
    },
    userImg: {
      width: 55,
      height: 55,
      borderRadius: 30,
      backgroundColor: theme === 'dark' ? Colors.darkGrey : Colors.lightGrey,
    },
    userDetails: {
      flex: 1,
      marginLeft: 8,
    },
    username: {
      fontWeight: '600',
      fontSize: 16,
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
    selectButtonCustom: {
      maxWidth: 65,
      height: 28,
      borderRadius: 6,
    },
    selectButtonCustomText: {
      fontWeight: '500',
      fontSize: 14,
    },
  });
