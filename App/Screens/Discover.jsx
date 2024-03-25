import React, {useState, useEffect} from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {fetchUsers} from "../../Utilities/fetchUsers";
import UserCard from "../../Components/UserCard";
import {useNavigation} from "@react-navigation/native";
import SearchBar from "../../Components/SearchBar";
import FilterSelectionModal from "../../Components/FilterSelectionModal"; 
import {schoolList} from "../Data/AmericanSchools"; 
import {majorsList} from "../Data/MajorsList";
import {gradeList} from "../Data/GradesList"; 
import FilterTags from "../../Components/FilterTags";

export default function Discover() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({college: [], grade: [], major: []});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      console.log("Filters before fetching:", filters);

      const fetchedUsers = await fetchUsers(filters, searchQuery);
      setUsers(fetchedUsers);
      console.log("Filtered users list:", fetchedUsers);
    };
    getUsers();
  }, [filters, searchQuery]); 

  const handleApplyFilters = (selectedFilters) => {
    console.log("Applying filters:", selectedFilters);

    setFilters(selectedFilters);
    setFilterModalVisible(false); // Close the modal after applying filters
  };

  const removeFilter = (category, filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].filter((f) => f !== filter),
    }));
  };

  const handleUserSelect = (user) => {
    // Navigate to UserProfile screen with selected user's data
    navigation.navigate("UserProfile", {user: user});
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.searchAndFilterContainer}>
          <SearchBar
            placeholder="Search users"
            style={styles.searchbarContainer}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <Ionicons name="options-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      <FilterTags filters={filters} onRemove={removeFilter} />

      <ScrollView>
        {users.map((user, index) => (
          <UserCard key={index} user={user} onCardPress={handleUserSelect}/>
        ))}
      </ScrollView>
      <FilterSelectionModal
        isVisible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApplyFilters={handleApplyFilters}
        categories={{
          college: schoolList,
          grade: gradeList,
          major: majorsList,
        }}
        currentFilters={filters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchAndFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 10,
  },
  searchbarContainer: {
    flex: 1,
    marginRight: 10,
  },
});
