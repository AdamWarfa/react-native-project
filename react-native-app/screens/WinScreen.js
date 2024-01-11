import React from "react";
import { View, Text, Button } from "react-native";
import ChooseMode from "./ChooseMode";

function WinScreen({ navigation, streak, hiScore, hiddenWord, setStreak, setHiScore }) {
  function win() {
    setStreak(streak + 1);
    if (streak > hiScore) {
      setHiScore(hiScore + 1);
    }
  }

  return (
    <View style={styles.container}>
      <Text>YOU WON!</Text>
      <Text>The correct word was {hiddenWord}</Text>
      <Button title="Play Again" onPress={() => navigation.navigate("ChooseMode")} />
    </View>
  );
}
