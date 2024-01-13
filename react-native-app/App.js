import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ChooseMode from "./screens/ChooseMode";
import InGameSinglePlayer from "./screens/InGameSinglePlayer";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
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
            streak: streak,
            setStreak: setStreak,
            hiScore: hiScore,
            setHiScore: setHiScore,
            lives: lives,
            setLives: setLives,
          }}
        />
        <Stack.Screen
          name="InGameSinglePlayer"
          component={InGameSinglePlayer}
          style={styles.screen}
          initialParams={{
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

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#222222",
  },
  text: {
    color: "#a0d8b3",
  },
});

export default App;
