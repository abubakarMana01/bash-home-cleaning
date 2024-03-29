import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAppContext} from '../../context';
import {Colors} from '../../constants';
import HandymanItem from './components/handymanItem';
import {Divider, LoaderView} from '../../components';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getAvailableHandymen} from '../../utils/apiRequests';

const AvailableHandymen = () => {
  const {theme, token} = useAppContext();
  const styles = styleSheet({theme});
  const navigation = useNavigation();
  const {params} = useRoute<
    RouteProp<ParamListBase> & {params: {title: string; serviceId: string}}
  >();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: params?.title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {data, status, isRefetching} = useQuery({
    queryKey: ['availableHanymen'],
    queryFn: () => getAvailableHandymen(token, params.serviceId),
  });

  if (status === 'loading' || isRefetching) {
    return (
      <>
        {Platform.OS === 'ios' && (
          <StatusBar
            barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          />
        )}
        <LoaderView />
      </>
    );
  }
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
      )}

      {status === 'success' && (
        <>
          {data.length ? (
            <FlatList
              contentContainerStyle={styles.flatList}
              ItemSeparatorComponent={() => (
                <View style={styles.separator}>
                  <Divider
                    color={
                      theme === 'dark' ? Colors.lightGrey : Colors.grey + '50'
                    }
                  />
                </View>
              )}
              data={data}
              renderItem={({item}) => (
                <HandymanItem data={item} serviceId={params.serviceId} />
              )}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{color: theme === 'dark' ? Colors.white : Colors.black}}>
                No service provider available
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default AvailableHandymen;

const styleSheet = ({}: IStyleSheet) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    flatList: {
      paddingVertical: 20,
      paddingHorizontal: 16,
    },
    separator: {
      paddingVertical: 12,
    },
  });

// const AVAILABLE_HANDYMEN = [
//   {
//     id: '1',
//     name: 'Aliyu Idris',
//     rating: 4.7,
//     reviewsCount: 123,
//     picture: 'https://source.unsplash.com/random/100x100/?$avatar',
//   },
//   {
//     id: '2',
//     name: 'Innocent Collins',
//     rating: 4.7,
//     reviewsCount: 123,
//     picture: 'https://source.unsplash.com/random/100x100/?$avatar',
//   },
//   {
//     id: '3',
//     name: 'Abayomi Akinsola',
//     rating: 4.7,
//     reviewsCount: 123,
//     picture: 'https://source.unsplash.com/random/100x100/?$avatar',
//   },
//   {
//     id: '4',
//     name: 'Idrissa Gana Gueye',
//     rating: 4.7,
//     reviewsCount: 123,
//     picture: 'https://source.unsplash.com/random/100x100/?$avatar',
//   },
//   {
//     id: '5',
//     name: 'Faruq Musa',
//     rating: 4.7,
//     reviewsCount: 123,
//     picture: 'https://source.unsplash.com/random/100x100/?$avatar',
//   },
//   {
//     id: '6',
//     name: 'Tammy Abraham',
//     rating: 4.7,
//     reviewsCount: 123,
//     picture: 'https://source.unsplash.com/random/100x100/?$avatar',
//   },
//   {
//     id: '7',
//     name: 'Mohammed Ahmed',
//     rating: 4.7,
//     reviewsCount: 123,
//     picture: 'https://source.unsplash.com/random/100x100/?$avatar',
//   },
//   {
//     id: '8',
//     name: 'John the Baptist',
//     rating: 4.7,
//     reviewsCount: 123,
//     picture: 'https://source.unsplash.com/random/100x100/?$avatar',
//   },
//   {
//     id: '9',
//     name: 'Oyelowo Moses',
//     rating: 4.7,
//     reviewsCount: 123,
//     picture: 'https://source.unsplash.com/random/100x100/?$avatar',
//   },
//   {
//     id: '10',
//     name: 'Chinedu Victor',
//     rating: 4.7,
//     reviewsCount: 123,
//     picture: 'https://source.unsplash.com/random/100x100/?$avatar',
//   },
//   {
//     id: '11',
//     name: 'Chidubem Isaac',
//     rating: 4.7,
//     reviewsCount: 123,
//     picture: 'https://source.unsplash.com/random/100x100/?$avatar',
//   },
//   {
//     id: '12',
//     name: 'Christopher Michael',
//     rating: 4.7,
//     reviewsCount: 123,
//     picture: 'https://source.unsplash.com/random/100x100/?$avatar',
//   },
// ];
