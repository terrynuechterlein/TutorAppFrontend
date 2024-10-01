import React, {useState, useRef, useEffect} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import { jwtDecode } from "jwt-decode";
// import "core-js/stable/atob";

const Chat = ({route, navigation}) => {
  const [messages, setMessages] = useState([]); // Replace with actual state management
  const [inputText, setInputText] = useState("");
  const {user} = route.params; // Assuming `user` contains profilePictureUrl and fullName
  const {token, userId} = useSelector((state) => state.auth);

  const scrollViewRef = useRef();

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://192.168.137.1:5016/api/messages/conversation/${user.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error("Failed to fetch messages:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 5000); // Fetch messages every 5 seconds

    return () => clearInterval(interval);
  }, []);
  console.log("Token:", token);

  const sendMessage = async (text) => {
    if (text) {
      console.log("sendMessage called with text:", text);
      try {
        const response = await fetch(`http://192.168.137.1:5016/api/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiverId: user.id,
            content: text,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: data.id,
              senderId: userId,
              receiverId: user.id,
              content: text,
              timestamp: new Date().toISOString(),
            },
          ]);
          setInputText("");
          scrollViewRef.current.scrollToEnd({ animated: true });
        } else {
          console.error("Failed to send message:", response.status);
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }else {
      console.log("sendMessage called with empty text");
    }
  };
  console.log("Token:", token);

  const getImageSource = (uri, defaultImage) => (uri ? { uri } : defaultImage);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Image
              source={getImageSource(user.profilePictureUrl)}
              style={styles.profilePic}
            />
            <Text style={styles.userName}>
              {user.fullName || `${user.firstName} ${user.lastName}`}
            </Text>
          </View>

          <ScrollView
            style={styles.messageContainer}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            {messages.map((message, index) => (
              <View key={index} style={styles.messageWrapper}>
                <Text
                  style={[
                    styles.timestamp,
                    message.senderId === userId
                      ? { alignSelf: "flex-end", marginRight: 10 }
                      : { alignSelf: "flex-start", marginLeft: 10 },
                  ]}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Text>
                <View
                  style={[
                    styles.messageBubble,
                    message.senderId === userId
                      ? styles.senderBubble
                      : styles.receiverBubble,
                  ]}
                >
                  <Text style={styles.messageText}>{message.content}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Write a message..."
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity
              onPress={() => {
                sendMessage(inputText);
              }}
            >
              <Ionicons name="send" size={24} color="rgba(0, 120, 255, 1)" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  messageContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  messageWrapper: {
    marginVertical: 5,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  senderBubble: {
    backgroundColor: "rgba(0, 120, 255, 1)",
    alignSelf: "flex-end",
    marginRight: 10,
    borderTopRightRadius: 0,
  },
  receiverBubble: {
    backgroundColor: "#ff8c00",
    alignSelf: "flex-start",
    marginLeft: 10,
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: "gray",
    marginBottom: 2,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "#fff",
  },
});

export default Chat;


