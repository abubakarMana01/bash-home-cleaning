import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../../constants';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ROUTES} from '../../../navigation';

export default function Categories() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable
          onPress={() => navigation.navigate(ROUTES.DETAILS)}
          style={[
            styles.categoryCard,
            // eslint-disable-next-line react-native/no-inline-styles
            {backgroundColor: '#FAC3E2', ...styles.marginInline},
          ]}>
          <MaterialCommunityIcons name="broom" size={45} color={Colors.black} />
          <Text style={styles.categoryText}>Cleaning</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate(ROUTES.DETAILS)}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.categoryCard,
            backgroundColor: '#D4D1FE',
          }}>
          <Entypo name="tools" size={45} color={Colors.black} />
          <Text style={styles.categoryText}>Repairs</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate(ROUTES.DETAILS)}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.categoryCard,
            backgroundColor: '#FFEAC9',
          }}>
          <MaterialCommunityIcons
            name="format-paint"
            size={45}
            color={Colors.black}
          />
          <Text style={styles.categoryText}>Painting</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate(ROUTES.DETAILS)}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.categoryCard, {backgroundColor: '#E9E9F6'}]}>
          <MaterialCommunityIcons
            name="washing-machine"
            size={45}
            color={Colors.black}
          />
          <Text style={styles.categoryText}>Laundry</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate(ROUTES.DETAILS)}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.categoryCard, {backgroundColor: '#FAC3E2'}]}>
          <MaterialIcons name="car-repair" size={45} color={Colors.black} />
          <Text style={styles.categoryText}>Mechanic</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  marginInline: {
    marginHorizontal: 16,
  },

  categoryCard: {
    width: 93,
    height: 120,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  categoryText: {
    textAlign: 'center',
    marginTop: 5,
    color: Colors.black,
  },
});
