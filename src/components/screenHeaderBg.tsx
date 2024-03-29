import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';

export default function ScreenHeaderBg({
  children,
  customStyles,
}: {
  children: React.ReactNode;
  customStyles?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.container, customStyles]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});
