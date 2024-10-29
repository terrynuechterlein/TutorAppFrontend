import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const CreateServiceModal = ({
  isVisible,
  onClose,
  userId,
  services,
  setServices,
}) => {
  // Local state for the modal inputs
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [tiers, setTiers] = useState([]);

  const addTier = () => {
    setTiers([...tiers, {title: "", description: "", price: ""}]);
  };

  const updateTierTitle = (index, text) => {
    const newTiers = [...tiers];
    newTiers[index].title = text;
    setTiers(newTiers);
  };

  const updateTierDescription = (index, text) => {
    const newTiers = [...tiers];
    newTiers[index].description = text;
    setTiers(newTiers);
  };

  const updateTierPrice = (index, text) => {
    const newTiers = [...tiers];
    newTiers[index].price = text;
    setTiers(newTiers);
  };

  const removeTier = (index) => {
    const newTiers = [...tiers];
    newTiers.splice(index, 1);
    setTiers(newTiers);
  };

  // Function to handle saving the service
  const handleSaveService = async () => {
    if (!serviceTitle || !serviceDescription) {
      Alert.alert("Please fill in all required fields");
      return;
    }

    // Prepare the data to send to the backend
    const serviceData = {
      title: serviceTitle,
      description: serviceDescription,
      tiers: tiers.map((tier) => ({
        title: tier.title,
        description: tier.description,
        price: parseFloat(tier.price),
      })),
    };

    try {
      const response = await fetch(
        `http://172.20.20.20:5016/api/tutors/${userId}/services`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serviceData),
        }
      );

      if (response.ok) {
        const newService = await response.json();
        setServices([...services, newService]);
        onClose();
        resetForm();
      } else {
        console.error("Failed to create service");
      }
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const resetForm = () => {
    setServiceTitle("");
    setServiceDescription("");
    setTiers([]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <ScrollView contentContainerStyle={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <AntDesign name="close" size={24} color="#000" />
          </TouchableOpacity>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}>
            <Text style={styles.modalTitle}>Create Service</Text>
            {/* Service Title Input */}
            <TextInput
              style={styles.input}
              placeholder="Service Title"
              placeholderTextColor="#aaa"
              value={serviceTitle}
              onChangeText={setServiceTitle}
            />
            {/* Service Description Input */}
            <TextInput
              style={[styles.input, {height: 100}]}
              placeholder="Service Description"
              placeholderTextColor="#aaa"
              value={serviceDescription}
              onChangeText={setServiceDescription}
              multiline
            />

            {/* Tiers Section */}
            {tiers.map((tier, index) => (
              <View key={index} style={styles.tierContainer}>
                <Text style={styles.sectionTitle}>Tier {index + 1}:</Text>
                {/* Tier Title Input */}
                <TextInput
                  style={styles.input}
                  placeholder={`Tier ${index + 1} Title`}
                  placeholderTextColor="#aaa"
                  value={tier.title}
                  onChangeText={(text) => updateTierTitle(index, text)}
                />
                {/* Tier Description Input */}
                <TextInput
                  style={[styles.input, {height: 80}]}
                  placeholder={`Tier ${index + 1} Description`}
                  placeholderTextColor="#aaa"
                  value={tier.description}
                  onChangeText={(text) => updateTierDescription(index, text)}
                  multiline
                />
                {/* Tier Price Input */}
                <TextInput
                  style={styles.input}
                  placeholder={`Tier ${index + 1} Price`}
                  placeholderTextColor="#aaa"
                  value={tier.price}
                  onChangeText={(text) => updateTierPrice(index, text)}
                  keyboardType="numeric"
                />
                {/* Remove Tier Button */}
                <TouchableOpacity onPress={() => removeTier(index)}>
                  <Text style={styles.removeTierText}>Remove Tier</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Add Tier Button */}
            <TouchableOpacity onPress={addTier} style={styles.addTierButton}>
              <Text style={styles.addTierText}>Add Tier</Text>
            </TouchableOpacity>
            {/* Modal Action Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleSaveService}
                style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default CreateServiceModal;

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  tierContainer: {
    marginBottom: 10,
  },
  addTierButton: {
    backgroundColor: "#ff8c00",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  addTierText: {
    color: "#fff",
    fontWeight: "bold",
  },
  removeTierText: {
    color: "#ff0000",
    textAlign: "right",
    marginTop: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#ff8c00",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});
