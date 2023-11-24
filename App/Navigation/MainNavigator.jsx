import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack'; 
import AppTabs from './AppTabs';
import EditProfile from '../Screens/EditProfileScreen'; 

import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const validateUserToken = async () => {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        try {
          const response = await fetch("http://10.2.1.246:5016/api/tutors/validateToken", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setInitialRoute("App");
          } else {
            setInitialRoute("Auth");
          }
        } catch (error) {
          console.error("Error validating token:", error);
          setInitialRoute("Auth");
        }
      } else {
        setInitialRoute("Auth");
      }
    };

    validateUserToken();
  }, []);

  if (initialRoute === null) {
    return null; 
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {initialRoute === "App" ? (
        <>
        <Stack.Screen name="App" component={AppTabs} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </>
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

export default MainNavigator;
