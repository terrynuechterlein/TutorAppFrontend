import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import COLORS from "../../Constants/colors";
import hornetlogo2 from "../../assets/hornetLogo2.png";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Dashboard({navigation}) {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text
        onPress={() => alert('This is the "Home" screen.')}
        style={{fontSize: 26, fontWeight: "bold"}}>
        Home Screen
      </Text>
    </View>
  );
}
