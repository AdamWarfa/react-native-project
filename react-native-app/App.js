import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ChooseMode from "./screens/ChooseMode";
import InGameSinglePlayer from "./screens/InGameSinglePlayer";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  const [hiddenWord, setHiddenWord] = useState("");
  const [hiddenLine, setHiddenLine] = useState("_");

  const [streak, setStreak] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [lives, setLives] = useState(0);

  async function getHiddenWordOnline(url) {
    const response = await fetch(url);
    const data = await response.json();
    const dataString = data.toString();
    console.log(dataString.toUpperCase());
    setHiddenWord(dataString.toUpperCase());
  }

  // function setHiddenWord(event) {
  //   document.querySelector("#guess-line").innerHTML = "";
  //   event.preventDefault();
  //   hiddenWord = document.querySelector("#hiddenWordValue").value.toUpperCase();
  //   console.log(hiddenWord);

  //   lives = hiddenWord.length + 3;
  //   document.querySelector("#lives-display").textContent = `LIVES: ${lives}`;

  //   generateGuessLine();
  // }

  function generateGuessLine(hiddenWord) {
    setHiddenLine("_".repeat(hiddenWord.length));
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChooseMode">
        <Stack.Screen
          name="ChooseMode"
          component={ChooseMode}
          initialParams={{
            hiddenWord: hiddenWord,
            getHiddenWordOnline: getHiddenWordOnline,
            hiddenLine: hiddenLine,
            generateGuessLine: generateGuessLine,
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
          initialParams={{
            hiddenWord: hiddenWord,
            getHiddenWordOnline: getHiddenWordOnline,
            hiddenLine: hiddenLine,
            generateGuessLine: generateGuessLine,
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
