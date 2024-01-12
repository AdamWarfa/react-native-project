import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Header from "../components/Header";

function ChooseMode({ navigation, route }) {
  const { streak, setStreak, hiScore, setHiScore, lives, setLives } = route.params;

  const [hiddenWord, setHiddenWord] = useState("");
  const [hiddenLine, setHiddenLine] = useState("_");

  async function getHiddenWordOnline(url) {
    const response = await fetch(url);
    const data = await response.json();
    const dataString = data.toString();
    console.log(dataString.toUpperCase());
    return dataString.toUpperCase();
  }

  function generateGuessLine(hiddenWord) {
    const guessLine = hiddenWord.replace(/[A-Z]/g, "_");
    return guessLine;
  }

  function singlePlayerMode() {
    try {
      // Fetch the hidden word
      getHiddenWordOnline("https://random-word-api.herokuapp.com/word").then((newHiddenWord) => {
        const newHiddenLine = generateGuessLine(newHiddenWord);

        // Update state variables
        setHiScore(Math.max(streak, hiScore));
        setLives(newHiddenWord.length + 3);

        // Update state variables directly when navigating
        setHiddenWord(newHiddenWord);
        setHiddenLine(newHiddenLine);

        // Navigate to "InGameSinglePlayer" screen with the updated hiddenWord
        navigation.navigate("InGameSinglePlayer", {
          hiddenWord: newHiddenWord,
          hiddenLine: newHiddenLine,
          streak: streak,
          hiScore: hiScore,
          lives: lives,
        });
      });
    } catch (error) {
      console.error("Error fetching hidden word:", hiddenWord, error);
      // Handle the error, e.g., show an error message to the user
    }
  }

  function multiPlayerMode() {
    document.querySelector("#player-modes").classList.add("hidden");
    document.querySelector("#fake-canvas").classList.remove("hidden");

    generateAlphabet(alphabet);
    document.querySelector("#word-form").addEventListener("submit", setHiddenWord);
  }
  return (
    <View>
      <Header streak={streak} setStreak={setStreak} hiScore={hiScore} setHiScore={setHiScore} lives={lives} setLives={setLives} />
      <Text>Choose Game Mode</Text>
      <Button title="Generate Random Word" onPress={() => singlePlayerMode()} />
      <Button title="Choose Secret Word" onPress={multiPlayerMode} />
    </View>
  );
}

export default ChooseMode;
