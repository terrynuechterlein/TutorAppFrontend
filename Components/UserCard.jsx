import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function UserCard({ user, onCardPress }) {
  return (
    <TouchableOpacity onPress={() => onCardPress(user)}>
    <View style={styles.card}>
      <View style={styles.bannerContainer}>
        <Image source={{ uri: user.bannerImageUrl }} style={styles.fullWidthImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.fullWidthImage}
        />
        <Image source={{ uri: user.profilePictureUrl }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.detail}>@{user.userName}</Text>
          <Text style={styles.detail}>{user.school}, {user.grade}</Text>
          <Text style={styles.detail}>{user.major}</Text>
          <View style={styles.socialStats}>
            <Text style={styles.socialStat}>Followers: {user.followers?.length || 0}</Text>
            <Text style={styles.socialStat}>Following: {user.following?.length || 0}</Text>
          </View>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bannerContainer: {
    position: 'relative',
    height: 200,
    width: '100%',
  },
  fullWidthImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  detail: {
    color: '#fff',
  },
  socialStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  socialStat: {
    fontSize: 14,
    color: '#fff',
  },
});
