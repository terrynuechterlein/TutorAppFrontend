import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FilterTags = ({ filters, onRemove }) => {
  const renderTags = (category) => {
    return filters[category].map((filter, index) => (
      <View key={index} style={styles.tag}>
        <Text style={styles.tagText}>{filter}</Text>
        <TouchableOpacity onPress={() => onRemove(category, filter)}>
          <Ionicons name="close-circle" size={16} color="black" />
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View style={styles.tagsContainer}>
      {Object.keys(filters).map((category) => renderTags(category))}
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    marginRight: 5,
    fontSize: 14,
  },
});

export default FilterTags;
