import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface IAvatar {
  initials: string;
  size: number;
}

const Avatar = ({initials, size}: IAvatar) => {
  const backgroundColor = generateColor();
  const fontSize = Math.floor(size / 2.5); // Font size based on avatar size
  const styles = styleSheet({size, backgroundColor, fontSize});

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{initials}</Text>
    </View>
  );
};

export default Avatar;

function generateColor() {
  // Generate a random dark color (RGB values below 128)
  const red = Math.floor(Math.random() * 180);
  const green = Math.floor(Math.random() * 180);
  const blue = Math.floor(Math.random() * 180);
  return `rgb(${red}, ${green}, ${blue})`;
}

const styleSheet = ({size, backgroundColor, fontSize}: any) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: size / 2,
      backgroundColor,
      width: size,
      height: size,
    },
    text: {
      color: '#fff',
      fontSize,
      fontWeight: '500',
      textTransform: 'uppercase',
    },
  });
