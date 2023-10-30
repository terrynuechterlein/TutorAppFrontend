import * as React from "react";
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
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dashboard from "../Screens/Dashboard";
import Message from "../Screens/Message";
import Profile from "../Screens/Profile";
import Discover from "../Screens/Discover";

const dashboardName = "Dashboard";
const messageName = "Message";
const discoverName = "Discover";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

export default function AppTabs({navigation}) {
  return (
      <Tab.Navigator
        initialRouteName={dashboardName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === discoverName) {
              iconName = focused ? "search" : "search-outline";
            } else if (rn === dashboardName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === messageName) {
              iconName = focused
                ? "chatbox-ellipses"
                : "chatbox-ellipses-outline";
            } else if (rn === profileName) {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name={discoverName} component={Discover} />
        <Tab.Screen name={dashboardName} component={Dashboard} />
        <Tab.Screen name={messageName} component={Message} />
        <Tab.Screen name={profileName} component={Profile} />
      </Tab.Navigator>
  );
}
