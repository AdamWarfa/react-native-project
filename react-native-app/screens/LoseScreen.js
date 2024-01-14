import React from "react";
import { Text, TouchableHighlight, SafeAreaView } from "react-native";

function LoseScreen({ styles, hiddenWord, setMode }) {
  function restartGame() {
    setMode("");
  }

  return (
    <SafeAreaView style={styles.homeScreen}>
      <Text style={styles.homeTitle}>YOU LOST...</Text>
      <Text style={styles.text}>The correct word was {hiddenWord}</Text>
      <TouchableHighlight onPress={restartGame}>
        <Text style={styles.homeButton}>Play Again</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

export default LoseScreen;
