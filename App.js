import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import MainNavigator from "./App/Navigation/MainNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
