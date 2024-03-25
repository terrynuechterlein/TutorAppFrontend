import React, {useState, useEffect} from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {BlueButton} from "../Constants/Button";
import {useSelector} from "react-redux";

export default function AboutComponent({summary, editable = false}) {
  const [editMode, setEditMode] = useState(false);
  const [bioText, setBioText] = useState(summary);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    setBioText(summary); // Update bioText whenever summary prop changes
  }, [summary]);
  
  // Toggle the edit mode
  const toggleEditMode = () => {
    console.log(`EditMode after toggle: ${!editMode}`);

    if (editMode) {
      console.log(`Bio text before saving: ${bioText}`);
    }
    setEditMode(!editMode);

    // If turning off edit mode and bioText is empty, reset to initial summary
    if (editMode && !bioText.trim()) {
      setBioText(summary);
    }
  };

  const updateBio = async () => {
    const url = `http://10.2.1.246:5016/api/tutors/${userId}/updateBio`;
    console.log(`Updating bio for userId: ${userId} with bioText: ${bioText}`);

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Bio: bioText }), 
      });

      if (response.ok) {
        console.log("Bio updated successfully");

        alert("Bio updated successfully");
        setEditMode(false);
      } else {
        console.log("Failed to update bio");

        alert("Failed to update bio");
      }
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to update bio: ${errorText}`);
        alert(`Failed to update bio: ${response.statusText}`);
        return;
      }
    } catch (error) {
      console.error("Failed to update bio:", error);
      alert("Error updating bio");
    }

  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.os === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.os === "ios" ? 64 : 0}>
      <View style={styles.container}>
        <Text style={styles.header}>About</Text>
        <View style={styles.aboutContainer}>
          {editMode && editable ? (
            <>
              <TextInput
                style={styles.input}
                onChangeText={setBioText}
                value={bioText}
                autoFocus={true}
                multiline={true}
                // onBlur={toggleEditMode}
              />
              <View style={styles.saveButtonContainer}>
                <BlueButton title="Save" onPress={updateBio}/>
              </View>
            </>
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
    </KeyboardAvoidingView>
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
  saveButtonContainer: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
