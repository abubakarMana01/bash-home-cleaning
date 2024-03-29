import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants';
import {useAppContext} from '../context';

export default function LoaderView() {
  const {theme} = useAppContext();

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={theme === 'dark' ? Colors.blue : Colors.darkBlue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
