import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppContext} from '../../../context';
import {Colors} from '../../../constants';
import StarRating from 'react-native-star-rating-widget';

export default function ReviewsHeader({
  data,
}: {
  data: {
    count: number;
    overallRatings: number;
  };
}) {
  const {theme} = useAppContext();
  const styles = styleSheet({theme});

  return (
    <View>
      <View style={styles.reviewBasicInfo}>
        <Text style={styles.overallRating}>
          {(data.overallRatings / data.count || 0).toFixed(1)}
        </Text>
        <StarRating
          color="#ffb700"
          rating={data.overallRatings / data.count || 0}
          animationConfig={{scale: 1}}
          starStyle={styles.starStyle}
          starSize={30}
          onChange={() => {}}
        />
        <Text style={styles.overallCount}>based on {data.count} reviews</Text>
      </View>
    </View>
  );
}

const styleSheet = ({theme}: IStyleSheet) =>
  StyleSheet.create({
    reviewBasicInfo: {
      alignItems: 'center',
    },
    overallRating: {
      fontSize: 56,
      fontWeight: '700',
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    overallCount: {
      color: theme === 'dark' ? Colors.grey : Colors.darkGrey,
      marginTop: 4,
    },
    starStyle: {
      marginHorizontal: 1,
    },
  });
