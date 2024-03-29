import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants';
import {useAppContext} from '../context';

interface IDivider {
  color?: string;
}

export default function Divider({color}: IDivider) {
  const {theme} = useAppContext();
  const styles = styleSheet({theme, color});

  return <View style={styles.divider} />;
}

const styleSheet = ({
  theme,
  color,
}: {
  theme: IStyleSheet['theme'];
  color: string | undefined;
}) =>
  StyleSheet.create({
    divider: {
      height: 1,
      backgroundColor: color || Colors.grey,
      opacity: theme === 'dark' ? 0.2 : 1,
    },
  });
