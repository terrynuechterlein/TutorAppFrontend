import React, {useState} from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import AutocompleteInput from "./AutoCompleteInput"; 
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../Constants/colors";
import {majorsList} from "../App/Data/MajorsList";
import {gradeList} from "../App/Data/GradesList";
import {Ionicons} from "@expo/vector-icons";
import { BlurView } from "@react-native-community/blur";


const FilterModal = ({isVisible, onClose, schoolList, applyFilters}) => {
  const [temporarySelections, setTemporarySelections] = useState({});

  const handleSelection = (type, selection) => {
    // Update temporary selections without closing the modal
    setTemporarySelections((prevSelections) => ({
      ...prevSelections,
      [type]: selection,
    }));
  };

  const handleApplyFilters = () => {
    // Apply all temporary selections and then close the modal
    Object.keys(temporarySelections).forEach((type) => {
      if (temporarySelections[type] && temporarySelections[type].label) {
        applyFilters(type, temporarySelections[type]);
      }
    });
    onClose(); 
    setTemporarySelections({}); // Reset temporary selections
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
            colors={[

              "#FFFFFF",
              "#FFA17F",
              "#00223E",
            ]}
            style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>College</Text>
              <AutocompleteInput
                list={schoolList}
                onSelect={(selectedSchool) =>
                  handleSelection("school", selectedSchool)
                }
                placeholder="Choose your school..."
              />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Major</Text>
              <AutocompleteInput
                list={majorsList}
                onSelect={(selectedMajor) =>
                  handleSelection("major", selectedMajor)
                }
                placeholder="Select your major..."
              />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Grade</Text>
              <AutocompleteInput
                list={gradeList}
                onSelect={(selectedGrade) =>
                  handleSelection("grade", selectedGrade)
                }
                placeholder="Select your grade..."
              />
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleApplyFilters}>
              <Text style={styles.buttonText}>Apply Filters</Text>
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
    backgroundColor: "rgba(0,0,0,0.8)", 
  },
  modalView: {
    width: "90%", 
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    backgroundColor: "#fff", 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.darkPurple, 
  },
  sectionContainer: {
    alignSelf: "stretch",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.darkOrange, 
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  buttonStyle: {
    backgroundColor: "#FFA17F", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#00223E",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default FilterModal;
