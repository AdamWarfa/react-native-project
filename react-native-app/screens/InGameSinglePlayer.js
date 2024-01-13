import React, { useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import Header from "../components/Header";

function InGameSinglePlayer({ route }) {
  const { styles, hiddenWord, hiddenLine, streak, setStreak, hiScore, setHiScore, lives, setLives } = route.params;

  return (
    <View style={styles.screen}>
      <Header styles={styles} streak={streak} setStreak={setStreak} hiScore={hiScore} setHiScore={setHiScore} lives={lives} setLives={setLives} />
      <Text style={styles.text}>{hiddenLine}</Text>
      <View>
        <Text style={styles.text}>Letters Guessed:</Text>
        <Text style={styles.text}>Incorrect Guesses:</Text>
        <Text style={styles.text}>
          Hidden word is {hiddenWord} {hiddenWord.length} {hiddenLine.length}
        </Text>
      </View>
    </View>
  );
}

export default InGameSinglePlayer;
