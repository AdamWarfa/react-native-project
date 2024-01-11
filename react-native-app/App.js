import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ChooseMode from "./screens/ChooseMode";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  let hiddenWord;
  let hiddenLine = "_";

  const [streak, setStreak] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [lives, setLives] = useState(0);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChooseMode">
        <Stack.Screen
          name="ChooseMode"
          component={ChooseMode}
          initialParams={{
            hiddenWord: hiddenWord,
            hiddenLine: hiddenLine,
            streak: streak,
            setStreak: setStreak,
            hiScore: hiScore,
            setHiScore: setHiScore,
            lives: lives,
            setLives: setLives,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
