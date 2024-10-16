import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../Constants/colors";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { logout } from "../Actions/AuthActions";
import SearchBar from "../../Components/SearchBar";

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: () => dispatch(logout()), // Dispatch logout action
        },
      ],
      { cancelable: false }
    );
  };

  const handleBecomeTutor = () => {
    navigation.navigate("BecomeTutor");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <SearchBar placeholder="Search settings" />

      <TouchableOpacity style={styles.option} onPress={handleBecomeTutor}>
        <Ionicons name="school-outline" size={24} color="black" />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>Become a Tutor</Text>
          <Text style={styles.optionSubtitle}>Sign up to be a tutor</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={24} color="black" />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>Sign Out</Text>
          <Text style={styles.optionSubtitle}>Sign out of your account</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 30, // Adjust for iOS status bar and push down
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomColor: COLORS.lightGray,
  },
  optionText: {
    marginLeft: 10,
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  optionSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
  },
});
