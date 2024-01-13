import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import Header from "../components/Header";
import InGameSinglePlayer from "./InGameSinglePlayer";

function ChooseMode({ streak, setStreak, hiScore, setHiScore, lives, setLives }) {
  const [mode, setMode] = useState("");

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
        setMode("singlePlayer");
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
    <View style={styles.screen}>
      <Text style={styles.text}>Choose Game Mode</Text>
      <TouchableHighlight onPress={() => singlePlayerMode()}>
        <Text style={styles.text}>Generate Random Word</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => multiPlayerMode()}>
        <Text style={styles.text}>Choose Secret Word</Text>
      </TouchableHighlight>

      {mode === "singlePlayer" && (
        <InGameSinglePlayer
          styles={styles}
          hiddenWord={hiddenWord}
          hiddenLine={hiddenLine}
          setHiddenLine={setHiddenLine}
          streak={streak}
          setStreak={setStreak}
          hiScore={hiScore}
          setHiScore={setHiScore}
          lives={lives}
          setLives={setLives}
          setMode={setMode}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#222222",
    height: "100%",
  },
  text: {
    color: "#a0d8b3",
    fontSize: 20,
    textAlign: "center",
  },
  alphabet: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  letter: {
    backgroundColor: "#222222",
    padding: 10,
    alignItems: "center",
    color: "#a0d8b3",
    fontSize: 20,
  },
});

export default ChooseMode;
