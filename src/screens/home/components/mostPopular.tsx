import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import PopularItem from './popularItem';

const MOST_POPULAR = [
  {
    id: '1',
    title: 'All',
  },
  {
    id: '2',
    title: 'Cleaning',
  },
  {
    id: '3',
    title: 'Mechanic',
  },
  {
    id: '4',
    title: 'Laundry',
  },
  {
    id: '5',
    title: 'Repairing',
  },
];

export default function MostPopular() {
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={MOST_POPULAR}
        ListHeaderComponent={() => <View />}
        ListHeaderComponentStyle={styles.listHeader}
        renderItem={({item, index}) => (
          <PopularItem isColored={index === 0} title={item.title} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    marginLeft: 16,
  },
});
