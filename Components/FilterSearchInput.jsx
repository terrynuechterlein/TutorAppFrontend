import React, {useState, useEffect} from "react";
import {View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";


const FilterSearchInput = ({list, onFilter, placeholder}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Filter the list whenever searchTerm changes
    const filteredList = list.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Notify parent component of the filtered list
    onFilter(filteredList);
  }, [searchTerm, list, onFilter]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor="#787878"
      />
      {searchTerm !== "" && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setSearchTerm("")}>
          <Ionicons name="close-circle" size={20} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 30,
  },
  clearButton: {
    position: 'absolute',
    right: 20,
    top: 10, 
  },
});

export default FilterSearchInput;
