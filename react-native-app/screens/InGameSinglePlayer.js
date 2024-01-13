import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, ScrollView, RefreshControl, SafeAreaView } from "react-native";
import Header from "../components/Header";
import WinScreen from "./WinScreen";
import LoseScreen from "./LoseScreen";

function InGameSinglePlayer({ styles, hiddenWord, hiddenLine, setHiddenLine, streak, setStreak, hiScore, setHiScore, lives, setLives, setMode }) {
  const [refreshing, setRefreshing] = useState(false);
  const [pressedRightLetters, setPressedRightLetters] = useState([]);
  const [pressedWrongLetters, setPressedWrongLetters] = useState([]);

  const [gameState, setGameState] = useState("playing");

  const onRefresh = useCallback(() => {
    setHiddenLine("");
    setLives(0);
    setMode("");

    // Simulate a delay (you can replace this with your actual async data fetching logic)
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (hiddenLine === hiddenWord) {
      win();
    }
  }, [hiddenLine]);

  useEffect(() => {
    if (lives <= 0) {
      gameOver();
    }
  }, [lives]);

  const alphabet = "`abcdefghijklmnopqrstuvwxy";
  function generateAlphabet(a) {
    let letterValue = String.fromCharCode(a.charCodeAt() + 1).toUpperCase();

    return (
      <TouchableWithoutFeedback key={letterValue} onPress={() => guessLetter(letterValue)}>
        <Text key={letterValue} style={pressedRightLetters.includes(letterValue) ? styles.guessedLetters : styles.letter}>
          {letterValue}
        </Text>
      </TouchableWithoutFeedback>
    );
  }

  function guessLetter(letter) {
    let currentGuess = letter.toUpperCase();

    if (hiddenWord.includes(currentGuess)) {
      setPressedRightLetters([...pressedRightLetters, letter]);

      let guessIndexes = [];
      for (let i = 0; i < hiddenWord.length; i++) {
        if (hiddenWord[i] === currentGuess) {
          guessIndexes.push(i);
        }
      }
      console.log(guessIndexes);

      let updatedLine = "";
      for (let i = 0; i < hiddenWord.length; i++) {
        if (guessIndexes.includes(i)) {
          updatedLine += currentGuess;
        } else {
          updatedLine += hiddenLine[i];
        }
        setHiddenLine(updatedLine);
      }
    } else {
      //   document.querySelector("#letter-button-" + letter).classList.add("tried-letter-wrong");
      //   console.log("Wrong");
      setLives(lives - 1);
    }
  }

  function win() {
    setStreak(streak + 1);
    if (streak > hiScore) {
      setHiScore(hiScore + 1);
    }
    setGameState("won");
  }

  function gameOver() {
    setStreak(0);
    setGameState("lost");
  }

  return (
    <>
      <Header styles={styles} streak={streak} setStreak={setStreak} hiScore={hiScore} setHiScore={setHiScore} lives={lives} setLives={setLives} />
      {gameState === "playing" && (
        <ScrollView style={styles.screen} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <Text style={styles.text}>{hiddenLine}</Text>
          <SafeAreaView>
            <Text style={styles.text}>
              Hidden word is {hiddenWord} {hiddenWord.length} {hiddenLine.length}
            </Text>
          </SafeAreaView>
          <SafeAreaView style={styles.alphabet}>{alphabet.split("").map(generateAlphabet)}</SafeAreaView>
        </ScrollView>
      )}

      {gameState === "won" && <WinScreen styles={styles} hiddenWord={hiddenWord} setMode={setMode} />}
      {gameState === "lost" && <LoseScreen styles={styles} hiddenWord={hiddenWord} setMode={setMode} />}
    </>
  );
}

export default InGameSinglePlayer;
