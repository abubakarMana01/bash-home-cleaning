import {
  Keyboard,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../constants';
import {AppTextInput} from '../../../components';
import {useAppContext} from '../../../context';

interface ISearchModal {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<
    React.SetStateAction<ISearchModal['modalVisible']>
  >;
}

export default function SearchModal({
  modalVisible,
  setModalVisible,
}: ISearchModal) {
  const {theme} = useAppContext();
  const styles = styleSheet({theme});

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <SafeAreaView style={styles.modal}>
        {Platform.OS === 'ios' && (
          <StatusBar
            barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor={Colors.dark}
          />
        )}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <AppTextInput
              placeholder="Search for services..."
              handleBackArrowPress={() => setModalVisible(false)}
              autoFocus
            />

            <View style={styles.trendingSection}>
              <Text style={styles.title}>Trending searches</Text>

              <View style={styles.trendingItemsContainer}>
                <TrendingItem title="Barber" />
                <TrendingItem title="Electrician" />
                <TrendingItem title="Home Cleaning" />
                <TrendingItem title="Carpenter" />
                <TrendingItem title="Refrigerator repair" />
                <TrendingItem title="Office cleaning" />
                <TrendingItem title="Women Spa" />
                <TrendingItem title="Plumber" />
                <TrendingItem title="AC Repair" />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
}

const styleSheet = ({theme}: IStyleSheet) =>
  StyleSheet.create({
    modal: {
      flex: 1,
      backgroundColor: theme === 'dark' ? Colors.dark : Colors.white,
    },
    modalContainer: {
      padding: 16,
      flex: 1,
    },
    trendingSection: {
      paddingTop: 32,
    },
    title: {
      fontWeight: '500',
      fontSize: 16,
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    trendingItemsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16,
    },

    trendingItem: {
      borderColor: Colors.grey,
      borderRadius: 6,
      borderWidth: 1,
      flexDirection: 'row',
      height: 30,
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
      marginBottom: 8,
    },
    trendingItemText: {
      fontSize: 12,
      color: theme === 'dark' ? Colors.grey : Colors.darkGrey,
      marginLeft: 6,
    },
  });

import Ionicons from 'react-native-vector-icons/Ionicons';

interface ITrendingItem {
  title: string;
}

const TrendingItem = ({title}: ITrendingItem) => {
  const {theme} = useAppContext();
  const styles = styleSheet({theme});

  return (
    <TouchableOpacity style={styles.trendingItem}>
      <Ionicons
        name="trending-up"
        size={14}
        color={theme === 'dark' ? Colors.grey : Colors.darkGrey}
      />
      <Text style={styles.trendingItemText}>{title}</Text>
    </TouchableOpacity>
  );
};
