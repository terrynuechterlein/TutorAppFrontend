import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../Constants/colors";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Actions/AuthActions";
import SearchBar from "../../Components/SearchBar";
import { changeTheme } from "../Actions/ThemeActions";

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const themeState = useSelector((state) => state.theme.theme);
  const isDarkMode = themeState === "dark";
  const themeColors = COLORS[themeState];

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

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    dispatch(changeTheme(newTheme));
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.lightGray }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>
          Settings
        </Text>
      </View>
      <SearchBar placeholder="Search settings" />

      <TouchableOpacity
        style={[styles.option, { borderBottomColor: themeColors.lightGray }]}
        onPress={handleBecomeTutor}
      >
        <Ionicons name="school-outline" size={24} color={themeColors.text} />
        <View style={styles.optionText}>
          <Text style={[styles.optionTitle, { color: themeColors.text }]}>
            Become a Tutor
          </Text>
          <Text style={[styles.optionSubtitle, { color: themeColors.gray }]}>
            Sign up to be a tutor
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={themeColors.text} />
      </TouchableOpacity>

      {/* New Change Theme Option */}
      <View style={[styles.option, { borderBottomColor: themeColors.lightGray }]}>
        <Ionicons name="moon-outline" size={24} color={themeColors.text} />
        <View style={styles.optionText}>
          <Text style={[styles.optionTitle, { color: themeColors.text }]}>
            Change Theme
          </Text>
          <Text style={[styles.optionSubtitle, { color: themeColors.gray }]}>
            Change between light or dark themes
          </Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? themeColors.primary : themeColors.gray}
          trackColor={{ false: themeColors.lightGray, true: themeColors.secondary }}
        />
      </View>

      <TouchableOpacity
        style={[styles.option, { borderBottomColor: themeColors.lightGray }]}
        onPress={handleSignOut}
      >
        <Ionicons name="log-out-outline" size={24} color={themeColors.text} />
        <View style={styles.optionText}>
          <Text style={[styles.optionTitle, { color: themeColors.text }]}>
            Sign Out
          </Text>
          <Text style={[styles.optionSubtitle, { color: themeColors.gray }]}>
            Sign out of your account
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={themeColors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 30, 
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
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
    borderBottomWidth: 1,
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
  },
});
