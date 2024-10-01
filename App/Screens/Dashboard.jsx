import React, {useEffect, useState} from "react";
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
import AccountSetupModal from "../../Components/AccountSetUpModal";
import {useSelector} from "react-redux";

export default function Dashboard({navigation}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `http://192.168.137.1:5016/api/tutors/${userId}/profile`
        );
        if (response.ok) {
          const data = await response.json();
          setIsModalVisible(!data.isSetupComplete); // Show modal only if setup is incomplete
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setIsModalVisible(false);

      }
    };
  
    fetchUserProfile();
  }, [userId]);
  
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text
        onPress={() => alert('This is the "Home" screen.')}
        style={{fontSize: 26, fontWeight: "bold"}}>
        Home Screen
      </Text>
      <AccountSetupModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      />
    </View>
  );
}
