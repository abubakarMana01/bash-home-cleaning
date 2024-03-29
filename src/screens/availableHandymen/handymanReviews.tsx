import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppContext} from '../../context';
import {Colors} from '../../constants';
import ReviewsHeader from './components/reviewsHeader';
import {Divider, LoaderView} from '../../components';
import ReviewCard from './components/reviewCard';
import {useQuery} from '@tanstack/react-query';
import {getHandymanReviews} from '../../utils/apiRequests';
import {useRoute} from '@react-navigation/native';
import colors from '../../constants/colors';

export default function HandymanReviews() {
  const {theme, token} = useAppContext();
  const {params} = useRoute() as {params: {workerId: string}};
  const styles = styleSheet({theme});

  const {data, status, isRefetching} = useQuery({
    queryKey: ['handymenReviews'],
    queryFn: () => getHandymanReviews(token, params?.workerId),
  });

  if (status === 'loading' || isRefetching) {
    return <LoaderView />;
  }

  return (
    <>
      {data?.reviews.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          ListHeaderComponent={() => (
            <>
              <ReviewsHeader data={data.ratings} />

              <View style={styles.separator}>
                <Divider
                  color={
                    theme === 'dark' ? Colors.lightGrey : Colors.grey + '70'
                  }
                />
              </View>
            </>
          )}
          ItemSeparatorComponent={() => <View style={{height: 32}} />}
          data={data?.reviews}
          renderItem={({item}) => <ReviewCard data={item} />}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: theme === 'dark' ? colors.white : colors.black}}>
            There are no reviews yet
          </Text>
        </View>
      )}
    </>
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
    separator: {
      marginVertical: 24,
    },
    scrollView: {
      padding: 16,
    },
  });
