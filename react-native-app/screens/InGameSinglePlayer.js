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
        <Text key={letterValue} style={pressedRightLetters.includes(letterValue) ? styles.guessedLetters : pressedWrongLetters.includes(letterValue) ? styles.wrongLetters : styles.letter}>
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
      setPressedWrongLetters([...pressedWrongLetters, letter]);
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
          <Text style={styles.hiddenLine}>{hiddenLine}</Text>
          <SafeAreaView>
            <Text style={{ ...styles.text, marginTop: 10 }}>Hidden word is {hiddenWord.length} letters long</Text>
          </SafeAreaView>
          <SafeAreaView style={styles.alphabet}>{alphabet.split("").map(generateAlphabet)}</SafeAreaView>
          <Text style={{ ...styles.text, marginTop: 40 }}>Scroll down to go home</Text>
        </ScrollView>
      )}

      {gameState === "won" && <WinScreen styles={styles} hiddenWord={hiddenWord} setMode={setMode} />}
      {gameState === "lost" && <LoseScreen styles={styles} hiddenWord={hiddenWord} setMode={setMode} />}
    </>
  );
}

export default InGameSinglePlayer;
