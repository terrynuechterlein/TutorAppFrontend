import React, {useState} from "react";
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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../Constants/colors";
import {useSelector} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import {BlurView} from "expo-blur";

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
      const response = await fetch("http://172.20.20.20:5016/api/projects", {
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
            userName: "UserName", 
            profilePictureUrl: "ProfilePictureUrl", 
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
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
              <View style={styles.modalContent}>
                <LinearGradient
                  colors={["rgba(255,140,0,0.9)", "rgba(75,0,130,0.9)"]}
                  style={styles.gradientBackground}>
                  {/* Close Icon */}
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}>
                    <Ionicons name="close" size={30} color="#fff" />
                  </TouchableOpacity>

                  {/* Modal Title */}
                  <Text style={styles.modalTitle}>Create Project</Text>

                  {/* Project Name Input */}
                  <TextInput
                    style={styles.input}
                    placeholder="Project Name"
                    placeholderTextColor="#ddd"
                    value={projectName}
                    onChangeText={setProjectName}
                  />

                  {/* Description Input */}
                  <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Description"
                    placeholderTextColor="#ddd"
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
                            ? "rgba(0, 255, 0, 0.7)"
                            : "rgba(255, 0, 0, 0.7)",
                        },
                      ]}
                      onPress={() => setIsOpenToRequests(!isOpenToRequests)}>
                      <Text style={styles.toggleButtonText}>
                        {isOpenToRequests ? "Yes" : "No"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Buttons */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={onClose}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.createButton}
                      onPress={handleCreateProject}>
                      <Text style={styles.createButtonText}>Create</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            </BlurView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 20,
    width: "85%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  gradientBackground: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#fff",
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
    color: "#fff",
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
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  createButton: {
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
