import React, {useState} from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../Constants/colors";
import {Picker} from "@react-native-picker/picker";
import {LinearGradient} from "expo-linear-gradient";
import {Image} from "react-native";
import {Button, OrangeButton} from "../../Constants/Button";
import {Ionicons} from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

export default function SignUp({navigation}) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isTutor, setIsTutor] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const handleRegistration = async () => {
    // Data to be sent to the backend
    const userData = {
      userName,
      email,
      isTutor,
      password,
    };

    try {
      let response = await fetch("http://192.168.0.48:5016/api/tutors/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      let json = await response.json();

      // Check for successful registration
      if (response.ok) {
        await save("userId", json.userId); // Save the user ID

        // Navigate to the Login page
        navigation.navigate("Login");
      } else {
        // Handle errors
        console.error("Error during registration:", json);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require("../../assets/tutors2.jpg")}
          style={{flex: 1}}
          resizeMode="cover">
          {/* Making gradient overlay less opaque to let the image show through */}
          <LinearGradient
            style={{flex: 1}}
            colors={[
              `${COLORS.torquoise}AA`, // adding AA for 2/3 opacity
              `${COLORS.purple}AA`,
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <View style={{flex: 1, padding: 20, justifyContent: "center"}}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.white,
                  marginBottom: 15,
                }}>
                <Ionicons name="mail-outline" size={24} color={COLORS.white} />
                <TextInput
                  style={{flex: 1, marginLeft: 10, color: COLORS.white}}
                  placeholder="Email"
                  placeholderTextColor={COLORS.white}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.white,
                  marginBottom: 15,
                }}>
                <Ionicons
                  name="person-outline"
                  size={24}
                  color={COLORS.white}
                />
                <TextInput
                  style={{flex: 1, marginLeft: 10, color: COLORS.white}}
                  placeholder="Username"
                  placeholderTextColor={COLORS.white}
                  onChangeText={(text) => setUserName(text)}
                  value={userName}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.white,
                  marginTop: 15,
                  marginBottom: 25,
                }}>
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={COLORS.white}
                />
                <TextInput
                  style={{flex: 1, marginLeft: 10, color: COLORS.white}}
                  placeholder="Password"
                  placeholderTextColor={COLORS.white}
                  secureTextEntry
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.white,
                  marginTop: 15,
                  marginBottom: 25,
                }}>
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={COLORS.white}
                />
                <TextInput
                  style={{flex: 1, marginLeft: 10, color: COLORS.white}}
                  placeholder="Confirm Password"
                  placeholderTextColor={COLORS.white}
                  secureTextEntry
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmPassword}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 15,
                }}>
                <TouchableOpacity
                  style={{
                    width: 24,
                    height: 24,
                    borderWidth: 2,
                    borderColor: COLORS.white,
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                  onPress={() => setIsTutor(!isTutor)}>
                  {isTutor && (
                    <Ionicons name="checkmark" size={20} color={COLORS.white} />
                  )}
                </TouchableOpacity>
                <Text style={{color: COLORS.white}}>
                  Select if you wish to sign up as a tutor
                </Text>
              </View>

              <OrangeButton title="Sign Up" onPress={handleRegistration} />

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 12,
                  justifyContent: "center",
                }}>
                <Text style={{fontSize: 16, color: COLORS.white}}>
                  Already have an account?
                </Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: COLORS.yellow,
                      fontWeight: "bold",
                      marginLeft: 4,
                    }}>
                    Login
                  </Text>
                </Pressable>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
