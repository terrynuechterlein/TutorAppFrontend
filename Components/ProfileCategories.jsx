import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, {useState} from "react";

export default function ProfileCategories() {
  const [selectedTab, setSelectedTab] = useState("Posts");
  const tabs = ["Posts", "Comments", "Media", "Likes", "Services"];

  const handlePress = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.listContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(tab)}
          style={[styles.tab, selectedTab === tab && styles.selectedTab]}>
          <Text style={styles.tabText}>{tab}</Text>
          <View
            style={[
              styles.underline,
              selectedTab === tab
                ? styles.activeUnderline
                : styles.inactiveUnderline,
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  tab: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedTab: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  tabText: {
    fontSize: 16,
    color: "#000",
  },
  underline: {
    marginTop: 10,
    height: 2,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  activeUnderline: {
    backgroundColor: "#00ffff",
  },
  inactiveUnderline: {
    backgroundColor: "transparent",
  },
});

