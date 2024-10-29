import React, {useState} from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {useSelector} from "react-redux";

import {LinearGradient} from "expo-linear-gradient";

const AccountSetupModal = ({isVisible, onClose}) => {
  const [setupStep, setSetupStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");

  const userId = useSelector((state) => state.auth.userId);

  const handleFinish = async () => {
    if (!userId) {
      console.error("Cannot update without userId.");
      return;
    }
    const userInfo = {
      firstName,
      lastName,
      school,
      major,
    };
    const initialSetupUrl = `http://172.20.20.20:5016/api/tutors/${userId}/initialSetup`; 

    try {
      const response = await fetch(initialSetupUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        console.log("Initial setup completed successfully.");
        onClose(); 
      } else {
        console.error("Failed to complete initial setup.");
      }
    } catch (error) {
      console.error("Error during initial setup:", error);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.centeredView}>
          <LinearGradient
            colors={["#00ffff", "#4B0082"]}
            style={styles.modalView}>
            <Text style={styles.modalText}>
              Finish setting up your profile!
            </Text>

            {setupStep === 1 && (
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>First Name:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setFirstName}
                    value={firstName}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Last Name:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setLastName}
                    value={lastName}
                  />
                </View>
              </View>
            )}
            {setupStep === 2 && (
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>College:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setSchool}
                    value={school}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Major:</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setMajor}
                    value={major}
                  />
                </View>
              </View>
            )}

            <View style={styles.dotContainer}>
              {Array.from({length: 2}, (_, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSetupStep(i + 1)}
                  style={[
                    styles.dot,
                    {backgroundColor: setupStep === i + 1 ? "#ff8c00" : "#fff"},
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={setupStep === 1 ? () => setSetupStep(2) : handleFinish}
              style={styles.button}>
              <Text style={styles.buttonText}>
                {setupStep === 1 ? "Next" : "Finish"}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalText: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  inputLabel: {
    color: "#fff",
    minWidth: 80,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ff8c00",
    borderWidth: 1,
    color: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  modalView: {
    width: "95%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  dotContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 4,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ff8c00",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});

export default AccountSetupModal;
