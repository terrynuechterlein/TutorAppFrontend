import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, SignUp, Welcome, Dashboard, BottomTabNavigator} from './Screens';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{ headerShown:false }}
      />
      <Stack.Screen
        name='Login'
        component={Login}
        options={{ headerShown:false }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{ headerShown:false }}
      />
      <Stack.Screen
        name='Dashboard'
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
