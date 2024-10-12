import React, {useEffect, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useSelector} from "react-redux"; // Import useSelector
import AuthStack from "./AuthStack";
import AppTabs from "./AppTabs";
import EditProfile from "../Screens/EditProfileScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import UserProfile from "../Screens/UserProfile";
import Chat from "../Screens/Chat"
import BecomeTutor from "../Screens/BecomeTutor";

import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="App" component={AppTabs} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="BecomeTutor" component={BecomeTutor} />

        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

export default MainNavigator;
