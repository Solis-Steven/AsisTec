import { View, Text } from "react-native";
import { useState } from "react";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTab } from "./src/navigation/BottomTap";

const App = () => {
  return (
    <NavigationContainer>
      <BottomTab/>
    </NavigationContainer>
  );
};

export default App;
