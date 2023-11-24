import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';

const DoodlePaper = ({ text }) => {
  const lines = [];
  const numberOfLines = 10;
  const lineHeight = 20;

  for (let i = 1; i <= numberOfLines; i++) {
    lines.push(
      <Line
        key={i}
        x1="0"
        y1={`${(i * 100) / numberOfLines}%`}
        x2="100%"
        y2={`${(i * 100) / numberOfLines}%`}
        stroke="#000"
        strokeWidth="0.2"
      />
    );
  }

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Path d="M0,0 L100,0 L100,100 L0,100 Z" fill="#f5f5f5" stroke="#000" strokeWidth="0.5" />
        {lines}
      </Svg>
      <Text style={[styles.text, { lineHeight }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 10,
  },
  text: {
    fontFamily: 'ChalkboardSE-Bold',
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    position: 'absolute',
    top: 15, 
    left: 10,
    right: 10,
  },
});

export default DoodlePaper;
