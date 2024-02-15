import React, {useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function AboutComponent({summary}) {
  const [editMode, setEditMode] = useState(false);
  const [bioText, setBioText] = useState(summary);

  // Toggle the edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
    // If turning off edit mode and bioText is empty, reset to initial summary
    if (editMode && !bioText.trim()) {
      setBioText(summary);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>About</Text>
      <View style={styles.aboutContainer}>
        {editMode ? (
          <TextInput
            style={styles.input}
            onChangeText={setBioText}
            value={bioText}
            autoFocus={true}
            multiline={true}
            onBlur={toggleEditMode}
          />
        ) : (
          <TouchableOpacity
            style={styles.flexContainer}
            onPress={toggleEditMode}>
            <Text style={styles.summaryText}>{bioText || "Bio..."}</Text>
            <Icon name="pencil" size={20} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  aboutContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 5,
    minHeight: 130,
  },
  summaryText: {
    fontSize: 16,
    color: "#000",
  },
  input: {
    fontSize: 16,
    minHeight: 130,
    color: "#000",
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minHeight: 130,
  },
  icon: {
    padding: 5,
    alignSelf: "flex-start",
  },
});
