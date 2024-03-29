import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import HomeHeader from './components/homeHeader';
import {ErrorView, LoaderView} from '../../components';
import BookAService from './components/bookAService';
import {useQuery} from '@tanstack/react-query';
import {useAppContext} from '../../context';
import {getHomeServices} from '../../utils/apiRequests';

export default function Home() {
  const {token} = useAppContext();
  const {data, status} = useQuery({
    queryKey: ['allServices'],
    queryFn: () => getHomeServices(token),
  });

  return (
    <View style={styles.wrapper}>
      <HomeHeader />

      {status === 'loading' && <LoaderView />}
      {status === 'error' && <ErrorView />}
      {status === 'success' && (
        <View style={styles.scrollViewContainer}>
          <ScrollView bounces={true}>
            <View style={styles.mainContainer}>
              <View style={[styles.section, styles.sectionMinMarginTop]}>
                {/* <SectionHeader title="Select a category" /> */}
                <BookAService data={data[0]} />
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  mainContainer: {
    paddingBottom: 32,
  },
  section: {
    marginTop: 40,
  },
  sectionMinMarginTop: {
    marginTop: 30,
  },
});
