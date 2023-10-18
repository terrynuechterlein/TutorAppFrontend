import {View, Text, Pressable} from "react-native";
import React from "react";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../Constants/colors";
import {Image} from "react-native";
import {Button, OrangeButton} from "../Components/Button";

const Welcome = ({navigation}) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.torquoise, COLORS.purple]}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
          <Image
            source={require("../assets/hornetLogo2.png")}
            style={{width: 200, height: 200}}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 400,
            width: "100%",

          }}>
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.orange,
            }}>
            Let's Get
          </Text>
          <Text
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: COLORS.yellow,
            }}>
            Started!
          </Text>

          <View style={{marginVertical: 22}}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
                marginVertical: 4,
              }}>
              Connect with other students
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}>
              and find a tutor near you!
            </Text>
          </View>
          <OrangeButton 
            title="Join Now"
            onPress={()=>navigation.navigate("SignUp")} 
            style={{
              marginTop: 22,
              width: "100%",
            }} 
            
            />
            <View style={{
              flexDirection:'row',
              marginTop: 12,
              justifyContent: 'center'
            }}>
              <Text style={{
                fontSize: 16,
                color: COLORS.white,
              }}>
                Already have an account ?
              </Text>
              <Pressable
              onPress={()=>navigation.navigate("Login")}
              >
                <Text style={{
                  fontSize: 16,
                  color: COLORS.yellow,
                  fontWeight: "bold",
                  marginLeft: 4
                }}>Login</Text>

              </Pressable>
            </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
