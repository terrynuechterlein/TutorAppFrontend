import React from "react";
import {View, Text, StyleSheet} from "react-native";

const ProfileStats = ({posts, followers, following}) => {
  return (
    <View style={styles.container}>

      <View style={styles.statContainer}>
        <Text style={styles.statTitle}>Followers</Text>
        <Text style={styles.statCount}>{followers}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statTitle}>Following</Text>
        <Text style={styles.statCount}>{following}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "start",
    gap: 5,
    marginRight: 10,
  },
  statContainer: {
    alignItems: "center",
    marginHorizontal: 4,
  },
  statTitle: {
    color: "#000000",
    fontSize: 10,
    fontWeight: "bold",
  },
  statCount: {
    color: "#000000",
    fontSize: 10,
  },
});

export default ProfileStats;
