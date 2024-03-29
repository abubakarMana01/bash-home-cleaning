import {Appearance, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../constants';
import AppButton from './appButton';
import {refresh} from '@react-native-community/netinfo';

export default function NoInternetView() {
  const [theme, setTheme] = useState(Appearance.getColorScheme()!);

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme!);
  });

  const styles = styleSheet({theme});

  return (
    <>
      {/* {Platform.OS === 'ios' && (
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
      )} */}

      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.subtitle}>Sorry, something went wrong.</Text>
          <Text style={styles.subtitle}>Please try again later.</Text>

          <AppButton
            title="Try again"
            onPress={async () => {
              await refresh();
            }}
            customStyles={styles.buttonStyles}
          />
        </View>
      </View>
    </>
  );
}

const styleSheet = ({theme}: IStyleSheet) =>
  StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: theme === 'dark' ? Colors.black : Colors.lightGrey,
    },
    container: {
      alignItems: 'center',
      borderRadius: 16,
      paddingVertical: 32,
      paddingHorizontal: 24,
      width: '100%',
      maxWidth: 300,
      backgroundColor: theme === 'dark' ? Colors.dark : Colors.white,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 16,
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: 4,
      color: theme === 'dark' ? Colors.white : Colors.black,
    },
    buttonStyles: {
      marginTop: 16,
    },
  });
