import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, SafeAreaView } from "react-native";
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
    <>
      {mode !== "singlePlayer" && (
        <SafeAreaView style={styles.homeScreen}>
          <Text style={styles.homeTitle}>Choose Game Mode</Text>
          <TouchableWithoutFeedback onPress={() => singlePlayerMode()}>
            <Text style={styles.homeButton}>Generate Random Word</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => multiPlayerMode()}>
            <Text style={styles.homeButton}>Choose Secret Word</Text>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      )}

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
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#222222",
    height: "100%",
  },
  header: {
    marginTop: 30,
  },

  homeScreen: {
    backgroundColor: "#222222",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#a0d8b3",
    fontSize: 20,
    textAlign: "center",
  },
  alphabet: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 100,
  },
  letter: {
    backgroundColor: "#222222",
    padding: 18,
    alignItems: "center",
    color: "#a0d8b3",
    fontSize: 30,
  },
  homeTitle: {
    color: "#a0d8b3",
    fontSize: 40,
    textAlign: "center",
    marginTop: -150,
    marginBottom: 80,
  },
  homeButton: {
    color: "#222222",
    backgroundColor: "#a0d8b3",
    fontSize: 20,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 25,
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    width: 250,
  },

  guessedLetters: {
    backgroundColor: "#555555",
    padding: 10,
    margin: 8,
    alignItems: "center",
    color: "#EEEEEE",
    fontSize: 30,
    borderRadius: 10,
    overflow: "hidden",

    pointerEvents: "none",
  },

  wrongLetters: {
    backgroundColor: "#222222",
    padding: 18,
    alignItems: "center",
    color: "#999999",
    fontSize: 30,
    opacity: 0.5,
    pointerEvents: "none",
  },

  hiddenLine: {
    color: "#a0d8b3",
    fontSize: 40,
    textAlign: "center",
    marginTop: "20%",
  },
});

export default ChooseMode;
