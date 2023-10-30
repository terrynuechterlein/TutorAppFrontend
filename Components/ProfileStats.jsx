import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileStats = ({ posts, followers, following }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statContainer}>
        <Text style={styles.statCount}>{posts}</Text>
        <Text style={styles.statTitle}>Posts</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statCount}>{followers}</Text>
        <Text style={styles.statTitle}>Followers</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statCount}>{following}</Text>
        <Text style={styles.statTitle}>Following</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  statContainer: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statTitle: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statCount: {
    color: '#ffffff',
    fontSize: 10,
  },
});

export default ProfileStats;
