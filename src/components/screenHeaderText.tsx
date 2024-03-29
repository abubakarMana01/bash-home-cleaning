import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants';

export default function ScreenHeaderText({title}: {title: string}) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.dark,
  },
});
