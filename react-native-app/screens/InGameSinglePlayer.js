import React, { useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Header from "../components/Header";

function InGameSinglePlayer({ route }) {
  const { styles, hiddenWord, hiddenLine, setHiddenLine, streak, setStreak, hiScore, setHiScore, lives, setLives } = route.params;

  const alphabet = "`abcdefghijklmnopqrstuvwxy";
  function generateAlphabet(a) {
    let letterValue = String.fromCharCode(a.charCodeAt() + 1).toUpperCase();
    console.log(letterValue);
    return (
      <TouchableHighlight key={letterValue} onPress={() => guessLetter(letterValue)} style={{ margin: 10, padding: 10, alignItems: "center" }}>
        <Text style={styles.letter}>{letterValue}</Text>
      </TouchableHighlight>
    );
  }

  function guessLetter(letter) {
    let currentGuess = letter.toUpperCase();

    if (hiddenWord.includes(currentGuess)) {
      //  document.querySelector("#letter-button-" + letter).classList.add("tried-letter-correct");

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
      }
      setHiddenLine(updatedLine);

      // else {
      //   document.querySelector("#letter-button-" + letter).classList.add("tried-letter-wrong");
      //   console.log("Wrong");
      //   lives = lives - 1;
      //   document.querySelector("#lives-display").textContent = `LIVES: ${lives}`;
      //   if (lives == 0) {
      //     gameOver();
      //   }
    }
  }

  return (
    <View style={styles.screen}>
      <Header styles={styles} streak={streak} setStreak={setStreak} hiScore={hiScore} setHiScore={setHiScore} lives={lives} setLives={setLives} />
      <Text style={styles.text}>{hiddenLine}</Text>
      <View>
        <Text style={styles.text}>
          Hidden word is {hiddenWord} {hiddenWord.length} {hiddenLine.length}
        </Text>
      </View>
      <View style={styles.alphabet}>{alphabet.split("").map(generateAlphabet)}</View>
    </View>
  );
}

export default InGameSinglePlayer;
