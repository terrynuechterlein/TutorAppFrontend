import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

export default function Message({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const { token, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchConversations();

    const interval = setInterval(() => {
      fetchConversations();
    }, 5000); // Fetch conversations every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.48:5016/api/messages/conversations`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      } else {
        console.error('Failed to fetch conversations:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };

  const getImageSource = (uri, defaultImage) => (uri ? { uri } : defaultImage);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Chat', { user: {
          id: item.userId,
          profilePictureUrl: item.ProfilePictureUrl,
          userName: item.UserName,
          firstName: item.FirstName,
          lastName: item.LastName,
          fullName: `${item.FirstName} ${item.LastName}`
        } });
      }}
    >
      <LinearGradient
        colors={['rgba(0, 120, 255, 1)', '#ff8c00']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.conversationItem}
      >
        <Image
          source={getImageSource(
            item.profilePictureUrl,
            // require('../../assets/default_profile.png')
          )}
          style={styles.profilePic}
        />
        <View style={styles.conversationDetails}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.userId}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 3,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  conversationDetails: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  lastMessage: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
});
