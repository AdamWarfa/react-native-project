import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import ChooseMode from "./screens/ChooseMode";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

function App() {
  const [streak, setStreak] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [lives, setLives] = useState(0);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <SafeAreaView style={styles.screen}>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <ChooseMode streak={streak} setStreak={setStreak} hiScore={hiScore} setHiScore={setHiScore} lives={lives} setLives={setLives} />
        </SafeAreaView>
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
