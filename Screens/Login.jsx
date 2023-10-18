import {View, Text, Pressable, ImageBackground, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import {React, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../Constants/colors";
import {Button, OrangeButton} from "../Components/Button";
import {Ionicons} from "@expo/vector-icons";

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
const handleLogin = async () => {
  const userData = {
    email,
    password,
  };

  try {
    let response = await fetch("http://10.2.1.246:5016/api/tutors/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Check if response has data before parsing
    const responseBody = await response.text();
    let json = responseBody ? JSON.parse(responseBody) : {};

    // Check for successful registration
    if (response.ok) {
      // Navigate to the Dashboard
      navigation.navigate("Dashboard");
    } else {
      // Handle any errors here (e.g., show a message to the user)
      console.error("Error during login:", json);
    }
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <View style={{flex: 1}}>
      <ImageBackground
        source={require("../assets/tutors1.png")}
        style={{flex: 1}}
        resizeMode="cover"
      >
        {/* Making gradient overlay less opaque to let the image show through */}
        <LinearGradient
          style={{flex: 1}}
          colors={[
            `${COLORS.torquoise}AA`, // adding AA for 2/3 opacity
            `${COLORS.purple}AA`    // adding AA for 2/3 opacity
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        >
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
                value={email}
                onChangeText={setEmail}
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
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <OrangeButton
              title="Sign In"
              onPress={handleLogin}
            />

            <View
              style={{
                flexDirection: "row",
                marginTop: 12,
                justifyContent: "center",
              }}>
              <Text style={{fontSize: 16, color: COLORS.white}}>
                Don't have an account?
              </Text>
              <Pressable onPress={() => navigation.navigate("SignUp")}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.yellow,
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}>
                  Register
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
