import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProfileCategories() {
  const [selectedTab, setSelectedTab] = useState("Resume");
  const [tabs, setTabs] = useState(["Resume", "Projects"]);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const checkTutorStatus = async () => {
      try {
        const response = await fetch(`http://192.168.0.48:5016/api/tutors/${userId}/isTutor`);
        if (response.ok) {
          const data = await response.json();
          if (data.isTutor) {
            setTabs(["Resume", "Projects", "Services"]);
          }
        } else {
          console.error("Failed to fetch tutor status");
        }
      } catch (error) {
        console.error("Error fetching tutor status:", error);
      }
    };
    checkTutorStatus();
  }, [userId]);

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
    backgroundColor: "#ff8c00",
  },
  inactiveUnderline: {
    backgroundColor: "transparent",
  },
});

