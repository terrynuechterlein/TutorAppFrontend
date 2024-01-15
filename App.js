import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./App/store";
import {NavigationContainer} from "@react-navigation/native";
import MainNavigator from "./App/Navigation/MainNavigator";
import LoadingComponent from "./Components/LoadingComponent";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
