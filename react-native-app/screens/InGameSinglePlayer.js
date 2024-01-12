import React, { useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import Header from "../components/Header";

function InGameSinglePlayer({ route }) {
  const { hiddenWord, getHiddenWordOnline, hiddenLine, generateGuessLine, streak, setStreak, hiScore, setHiScore, lives, setLives } = route.params;

  return (
    <View>
      <Header streak={streak} setStreak={setStreak} hiScore={hiScore} setHiScore={setHiScore} lives={lives} setLives={setLives} />
      <Text>{hiddenLine}</Text>
      <View>
        <Text>Letters Guessed:</Text>
        <Text>Incorrect Guesses:</Text>
        <Text>Hidden word is {hiddenWord}</Text>
      </View>
    </View>
  );
}

export default InGameSinglePlayer;
