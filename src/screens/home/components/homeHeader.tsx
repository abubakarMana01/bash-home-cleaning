import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ScreenHeaderBg} from '../../../components';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../../constants';
import {useAppContext} from '../../../context';
import SearchModal from './searchModal';

export default function HomeHeader() {
  const [modalVisible, setModalVisible] = useState(false);
  const {theme, user} = useAppContext();

  const styles = styleSheet({theme});
  return (
    <ScreenHeaderBg customStyles={styles.screenHeader}>
      <View style={styles.headerUser}>
        <Image
          source={require('../../../assets/neymar.jpeg')}
          style={styles.userImage}
          resizeMode="cover"
        />

        <View style={styles.userInfo}>
          <Text style={styles.greeting}>Welcome</Text>
          <View style={styles.nameAndNotification}>
            <Text style={styles.username}>{user?.lastName}</Text>

            <Pressable>
              <Feather name="bell" size={24} color={Colors.darkGrey} />
            </Pressable>
          </View>
        </View>
      </View>

      <SearchModal {...{modalVisible, setModalVisible}} />
    </ScreenHeaderBg>
  );
}

const styleSheet = ({}: IStyleSheet) =>
  StyleSheet.create({
    screenHeader: {
      zIndex: 10,
    },
    headerUser: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userInfo: {
      flex: 1,
    },
    nameAndNotification: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: 30,
      marginRight: 8,
    },
    greeting: {
      fontSize: 14,
      opacity: 0.7,
      color: Colors.dark,
    },
    username: {
      fontSize: 22,
      fontWeight: '600',
      color: Colors.dark,
      textTransform: 'capitalize',
    },
  });
