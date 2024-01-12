import React from "react";
import { View, Text, Button } from "react-native";
import Header from "../components/Header";

function ChooseMode({ navigation, route }) {
  const { hiddenWord, getHiddenWordOnline, hiddenLine, generateGuessLine, streak, setStreak, hiScore, setHiScore, lives, setLives } = route.params;

  async function singlePlayerMode() {
    try {
      // Fetch the hidden word
      const newHiddenWord = await getHiddenWordOnline("https://random-word-api.herokuapp.com/word");

      // Update state variables
      setHiScore(Math.max(streak, hiScore));
      setLives(newHiddenWord.length + 3);

      // Check if newHiddenWord is defined before using it
      if (newHiddenWord) {
        generateGuessLine(newHiddenWord);

        // Navigate to "InGameSinglePlayer" screen with the updated hiddenWord
        navigation.navigate("InGameSinglePlayer", {
          hiddenWord: newHiddenWord,
          getHiddenWordOnline: getHiddenWordOnline,
          hiddenLine: hiddenLine,
          generateGuessLine: generateGuessLine,
          streak: streak,
          setStreak: setStreak,
          hiScore: hiScore,
          setHiScore: setHiScore,
          lives: lives,
          setLives: setLives,
        });
      } else {
        console.error("Error: Fetched hidden word is undefined");
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error fetching hidden word:", hiddenWord, error);
      // Handle the error, e.g., show an error message to the user
    }
  }

  async function fetchAndNavigate() {
    await singlePlayerMode();
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
      <Button title="Generate Random Word" onPress={() => fetchAndNavigate()} />
      <Button title="Choose Secret Word" onPress={multiPlayerMode} />
    </View>
  );
}

export default ChooseMode;
