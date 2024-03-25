import React, {useState, useCallback, useEffect} from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import FilterSearchInput from "./FilterSearchInput"; 
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {BlueButton} from "../Constants/Button";
import {LinearGradient} from "expo-linear-gradient";

const FilterSelectionModal = ({
  isVisible,
  onClose,
  onApplyFilters,
  categories,
  currentFilters, // This prop is used to initialize the modal with current filters
}) => {
  const [selectedCategory, setSelectedCategory] = useState("college");
  const [selectedFilters, setSelectedFilters] = useState(currentFilters || {
    college: [],
    grade: [],
    major: [],
  });
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    // Reset selected filters when currentFilters prop changes
    setSelectedFilters(currentFilters);
  }, [currentFilters]);

  const handleSelectFilter = useCallback((category, filter) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(filter)
        ? prev[category].filter((f) => f !== filter)
        : [...prev[category], filter],
    }));
  }, []);

  const renderFilterOption = ({item}) => (
    <TouchableOpacity
      style={styles.filterOption}
      onPress={() => handleSelectFilter(selectedCategory, item.label)}
      key={item.label}>
      <Text style={styles.filterOptionText}>{item.label}</Text>
      {selectedFilters[selectedCategory].includes(item.label) && (
        <Ionicons name="checkmark" size={20} color="#007bff" />
      )}
    </TouchableOpacity>
  );

  const handleFilterList = useCallback((filtered) => {
    setFilteredList(filtered);
  }, []);

  const placeholderMapping = {
    college: "Choose a college...",
    grade: "Choose a grade...",
    major: "Choose a major...",
  };

  const currentPlaceholder =
    placeholderMapping[selectedCategory] || "Select filter";

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Filters</Text>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.tabContainer}>
                {Object.keys(categories).map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.tab,
                      selectedCategory === category && styles.tabSelected,
                    ]}
                    onPress={() => setSelectedCategory(category)}>
                    <Text style={styles.tabText}>{category.toUpperCase()}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <FilterSearchInput
                list={categories[selectedCategory]}
                onFilter={handleFilterList}
                placeholder={currentPlaceholder}
              />
              <FlatList
                data={
                  filteredList.length > 0
                    ? filteredList
                    : categories[selectedCategory]
                }
                renderItem={renderFilterOption}
                keyExtractor={(item, index) => `item-${index}`}
                style={styles.filterList}
              />
              <View style={styles.buttonContainer}>
                <BlueButton
                  title="Apply Filters"
                  onPress={() => onApplyFilters(selectedFilters)}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modalContainer: {
    height: "50%",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  tabSelected: {
    backgroundColor: "#007bff",
  },
  tabText: {
    color: "black",
    fontWeight: "bold",
  },
  filterList: {
    width: "100%",
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  filterOptionText: {
    fontSize: 16,
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  filterOptionText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20, 
  },
});

export default FilterSelectionModal;
