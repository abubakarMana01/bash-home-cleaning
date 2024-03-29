import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../../constants';
import {useAppContext} from '../../../context';

export default function PopularItem({
  title,
  isColored = false,
}: {
  title: string;
  isColored?: boolean;
}) {
  const {theme} = useAppContext();
  const styles = styleSheet({theme, isColored});

  return (
    <TouchableOpacity style={styles.popularItemContainer}>
      <Text style={styles.popularItemText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styleSheet = ({theme, isColored}: IStyleSheet & {isColored: boolean}) =>
  StyleSheet.create({
    popularItemContainer: {
      paddingHorizontal: 24,
      paddingVertical: 8,
      borderRadius: 8,
      marginRight: 10,
      borderWidth: 1,
      borderColor: isColored
        ? theme === 'dark'
          ? Colors.blue
          : Colors.darkBlue
        : Colors.grey,
      backgroundColor: isColored
        ? theme === 'dark'
          ? Colors.blue
          : Colors.darkBlue
        : 'transparent',
    },
    popularItemText: {
      color: theme === 'dark' || isColored ? Colors.white : Colors.black,
    },
  });
