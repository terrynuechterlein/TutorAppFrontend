import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2', 
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: '#000', 
  },
});

export default LoadingComponent;
