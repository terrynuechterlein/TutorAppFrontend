import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";

const AutocompleteInput = ({ list, onSelect, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(list); 
  const [isFocused, setIsFocused] = useState(false); 

  useEffect(() => {
    if (searchTerm) {
      const filtered = list.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(list); 
    }
  }, [searchTerm, list]);

  useEffect(() => {
    console.log("searchTerm state updated to:", searchTerm); 
  }, [searchTerm]);

  const handleSelect = (item) => {
    setSearchTerm(item.label); 
    setIsFocused(false); 
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        style={styles.input}
        placeholderTextColor="#787878"
        onFocus={() => setIsFocused(true)} 
      />
      {isFocused && (
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => `item-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          )}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "#ffffff",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 25,
    width: "100%",
    color: "#000",
  },
  list: {
    maxHeight: 200,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default AutocompleteInput;
