// Components/CreateProjectModal.js

import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../Constants/colors";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CreateProjectModal({
  isVisible,
  onClose,
  onCreateProject,
}) {
  const userId = useSelector((state) => state.auth.userId);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [isOpenToRequests, setIsOpenToRequests] = useState(true);

  const handleCreateProject = async () => {
    if (!projectName) {
      alert("Please enter a project name.");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.48:5016/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorId: userId,
          name: projectName,
          description: description,
          isOpenToRequests: isOpenToRequests,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const newProject = {
          id: data.projectId,
          name: projectName,
          description: description,
          isOpenToRequests: isOpenToRequests,
          creator: {
            id: userId,
            userName: "YourUserName", // Replace with actual userName from store
            profilePictureUrl: "YourProfilePictureUrl", // Replace with actual URL
          },
          members: [], // Initially empty
        };
        onCreateProject(newProject);
        onClose();
        setProjectName("");
        setDescription("");
        setIsOpenToRequests(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to create project.");
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <LinearGradient
        colors={["#ff8c00", "#4B0082"]}
        style={styles.modalBackground}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <View style={styles.card}>
              <Text style={styles.modalTitle}>Create Project</Text>
              <TextInput
                style={styles.input}
                placeholder="Project Name"
                placeholderTextColor="#ccc"
                value={projectName}
                onChangeText={setProjectName}
              />
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Description"
                placeholderTextColor="#ccc"
                value={description}
                onChangeText={setDescription}
                multiline
              />
              {/* Open to Requests Toggle */}
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Open to Requests:</Text>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    {
                      backgroundColor: isOpenToRequests
                        ? COLORS.appblue
                        : "#ccc",
                    },
                  ]}
                  onPress={() => setIsOpenToRequests(!isOpenToRequests)}
                >
                  <Text style={styles.toggleButtonText}>
                    {isOpenToRequests ? "Yes" : "No"}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onClose}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={handleCreateProject}
                >
                  <Text style={styles.createButtonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {/* Close Icon */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
  },
  modalContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // For Android
    elevation: 5,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.appblue,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: "top",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  createButton: {
    backgroundColor: COLORS.appblue,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
});
