import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StarRating from 'react-native-star-rating-widget';
import {useAppContext} from '../../../context';
import {Colors} from '../../../constants';
import {Avatar} from '../../../components';

export default function ReviewCard({data}: {data: IReview}) {
  const {theme} = useAppContext();
  const styles = styleSheet({theme});

  const initials = (data.customer.firstName + ' ' + data.customer.lastName)
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        {/* <Image
          source={require('../../../assets/user2.png')}
          style={styles.image}
        /> */}

        <Avatar initials={initials} size={45} />

        <View style={styles.userInfo}>
          <Text style={styles.username}>
            {data.customer.firstName} {data.customer.lastName}
          </Text>
          <View style={styles.infoFlex}>
            <Text style={styles.rating}>{(data.rating || 0).toFixed(1)}</Text>
            <StarRating
              color="#ffb700"
              rating={+data.rating}
              animationConfig={{scale: 1}}
              starStyle={styles.starStyle}
              starSize={16}
              onChange={rating => {
                console.log(rating);
              }}
            />

            <Text style={styles.time}>
              {new Date(data.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.reviewText}>{data.comment}</Text>
    </View>
  );
}

const styleSheet = ({theme}: IStyleSheet) =>
  StyleSheet.create({
    container: {},
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userInfo: {
      flex: 1,
      marginLeft: 8,
    },
    username: {
      fontSize: 16,
      fontWeight: '600',
      color: theme === 'dark' ? Colors.white : Colors.black,
      textTransform: 'capitalize',
    },
    infoFlex: {
      marginTop: 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 45,
      height: 45,
      borderRadius: 22.5,
    },
    starStyle: {
      marginHorizontal: -1,
    },
    rating: {
      fontWeight: '500',
      marginRight: 8,
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    time: {
      marginLeft: 'auto',
      color: theme === 'dark' ? Colors.grey : Colors.darkGrey,
    },
    reviewText: {
      marginTop: 8,
      color: theme === 'dark' ? Colors.grey : Colors.darkGrey,
    },
  });
