import React, { useState, useCallback } from "react";
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, ScrollView, RefreshControl, SafeAreaView } from "react-native";
import Header from "../components/Header";

function InGameSinglePlayer({ styles, hiddenWord, hiddenLine, setHiddenLine, streak, setStreak, hiScore, setHiScore, lives, setLives, setMode }) {
  const [refreshing, setRefreshing] = useState(false);
  const [pressedLetters, setPressedLetters] = useState([]);

  const onRefresh = useCallback(() => {
    // Logic to refresh the content (reload hiddenWord, etc.)
    // For simplicity, let's just reset the hiddenLine to an empty string
    setHiddenLine("");
    setLives(0);
    setMode("");

    // Simulate a delay (you can replace this with your actual async data fetching logic)
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const alphabet = "`abcdefghijklmnopqrstuvwxy";
  function generateAlphabet(a) {
    let letterValue = String.fromCharCode(a.charCodeAt() + 1).toUpperCase();

    return (
      <TouchableWithoutFeedback key={letterValue} onPress={() => guessLetter(letterValue)}>
        <Text key={letterValue} style={pressedLetters.includes(letterValue) ? styles.guessedLetters : styles.letter}>
          {letterValue}
        </Text>
      </TouchableWithoutFeedback>
    );
  }

  function guessLetter(letter) {
    let currentGuess = letter.toUpperCase();

    if (hiddenWord.includes(currentGuess)) {
      setPressedLetters([...pressedLetters, letter]);

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
      //   if (lives == 0) {
      //     gameOver();
    }
  }

  return (
    <ScrollView style={styles.screen} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Header styles={styles} streak={streak} setStreak={setStreak} hiScore={hiScore} setHiScore={setHiScore} lives={lives} setLives={setLives} />
      <Text style={styles.text}>{hiddenLine}</Text>
      <SafeAreaView>
        <Text style={styles.text}>
          Hidden word is {hiddenWord} {hiddenWord.length} {hiddenLine.length}
        </Text>
      </SafeAreaView>
      <SafeAreaView style={styles.alphabet}>{alphabet.split("").map(generateAlphabet)}</SafeAreaView>
    </ScrollView>
  );
}

export default InGameSinglePlayer;
