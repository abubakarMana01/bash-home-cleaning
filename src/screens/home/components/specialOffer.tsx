import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../constants';

export default function SpecialOffer() {
  return (
    <LinearGradient
      colors={['#1C1C25', '#5D4FB9']}
      style={[styles.specialOfferContainer, styles.marginInline]}
      start={{x: 0.2, y: 0}}
      end={{x: 1, y: 0.8}}>
      {/* <View style={[styles.specialOfferContainer, styles.marginInline]}> */}
      <View style={styles.specialOfferTop}>
        <Text style={styles.specialOfferPercentage}>30%</Text>

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Explore offer</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.specialOfferTitle}>Todays Special!</Text>
      <Text style={styles.specialOfferDescription}>
        Get a discount for every order today
      </Text>
      {/* </View> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  specialOfferContainer: {
    paddingHorizontal: 28,
    paddingVertical: 24,
    backgroundColor: Colors.dark,
    borderRadius: 30,
    minHeight: 140,
  },
  marginInline: {
    marginHorizontal: 16,
  },

  specialOfferTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  specialOfferPercentage: {
    color: Colors.white,
    fontSize: 48,
    fontWeight: '500',
  },

  buttonContainer: {
    height: 35,
    paddingHorizontal: 14,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  specialOfferTitle: {
    marginTop: 10,
    color: Colors.white,
    fontSize: 17,
  },
  specialOfferDescription: {
    color: Colors.white,
    opacity: 0.7,
    fontSize: 15,
    marginTop: 8,
  },
});
