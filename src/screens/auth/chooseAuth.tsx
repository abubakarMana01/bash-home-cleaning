import {ImageBackground, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {AppButton} from '../../components';
import {Colors} from '../../constants';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {ROUTES} from '../../navigation';
import {useAppContext} from '../../context';

export default function ChooseAuth() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {theme} = useAppContext();
  const styles = styleSheet({theme});

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.wrapper}>
      <View style={styles.container}>
        <AppButton
          title="Sign Up"
          onPress={() => navigation.navigate(ROUTES.SIGNUP)}
          full
        />
        <AppButton
          title="Log In"
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
          customStyles={styles.loginButton}
          customTextStyles={{}}
          full
        />
      </View>
    </ImageBackground>
  );
}

const styleSheet = ({}: IStyleSheet) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    loginButton: {
      marginTop: 10,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: Colors.darkBlue,
    },
  });
