import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';

const CircularNumberContainer = ({ayahNumber}) => {
    // const { ayahNumber } = useLocalSearchParams<{ ayahNumber: string }>();

  return (
    <LinearGradient
      colors={['#BBFFBB', '#AADD00']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.circularContainer}
    >
      <Text style={styles.numberText}>{ayahNumber}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  circularContainer: {
    width: 27,
    height: 27,
    borderRadius: 50,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 12,
    color: 'rgb(9, 9, 9)',
    fontWeight: '900',
  },
});

export default CircularNumberContainer;