import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants';
import {useAppContext} from '../context';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';

interface ISectionHeader {
  title: string;
  withPaddingHorizontal?: boolean;
  navigationRoute?: string;
}

export default function SectionHeader({
  title,
  withPaddingHorizontal = true,
  navigationRoute,
}: ISectionHeader) {
  const {theme} = useAppContext();
  const styles = styleSheet({theme, withPaddingHorizontal});
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={[styles.sectionTitleContainer, styles.marginInline]}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {navigationRoute && (
        <TouchableOpacity onPress={() => navigation.navigate(navigationRoute)}>
          <Text style={styles.sectionRightActionText}>See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styleSheet = ({theme, withPaddingHorizontal}: any) =>
  StyleSheet.create({
    sectionTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 14,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    sectionRightActionText: {
      color: theme === 'dark' ? Colors.blue : Colors.darkBlue,
    },
    marginInline: {
      marginHorizontal: withPaddingHorizontal ? 16 : 0,
    },
  });
