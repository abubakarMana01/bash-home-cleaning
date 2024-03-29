import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppContext} from '../context';
import {Colors} from '../constants';

interface IErrorView {
  error?: string;
}

export default function ErrorView({error}: IErrorView) {
  const {theme} = useAppContext();
  const styles = styleSheet({theme});

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error || 'Something went wrong!'}</Text>
    </View>
  );
}

const styleSheet = ({theme}: IStyleSheet) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
  });
