import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../Constants/colors';

export default function SearchBar({ placeholder, style, onChangeText }) {
  return (
    <View style={[styles.searchBar, style]}>
      <Ionicons name="search" size={20} color="gray" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        style={styles.searchInput}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightgrey,
    borderRadius: 20,
    padding: 10,
    margin: 15,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: 'black',
  },
});