import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";

const GameComponent = () => {
  const alphabet = "`abcdefghijklmnopqrstuvwxyz";

  function generateAlphabet(a) {
    let letterValue;
    for (let i = 0; i < 26; i++) {
      letterValue = String.fromCharCode(a.charCodeAt(i) + 1).toUpperCase();
      console.log(letterValue);
      document.querySelector("#letters").insertAdjacentHTML(
        "beforeend",
        /*HTML*/ `
<input id="letter-button-${letterValue}" class="letter-buttons" type="button" value=${letterValue} onclick="guessLetter('${letterValue}')">
`
      );
    }
  }

  async function getHiddenWordOnline(url) {
    const response = await fetch(url);
    const data = await response.json();
    const dataString = data.toString();
    return dataString;
  }

  function setHiddenWord(event) {
    document.querySelector("#guess-line").innerHTML = "";
    event.preventDefault();
    hiddenWord = document.querySelector("#hiddenWordValue").value.toUpperCase();
    console.log(hiddenWord);

    lives = hiddenWord.length + 3;
    document.querySelector("#lives-display").textContent = `LIVES: ${lives}`;

    generateGuessLine();
  }

  function generateGuessLine() {
    hiddenLine = "_";
    for (let i = 0; i < hiddenWord.length - 1; i++) {
      hiddenLine = hiddenLine + "_";
    }
    console.log(hiddenLine);

    document.querySelector("#guess-line").insertAdjacentHTML(
      "beforeend",
      /*HTML*/ `
<h1 id="guess-word">${hiddenLine}</h1>
  `
    );
  }

  function getKeydownLetter(event) {
    if (alphabet.includes(event.key)) {
      console.log(event.key);
      guessLetter(event.key.toUpperCase());
    } else {
      return null;
    }
  }

  function guessLetter(letter) {
    //   event.preventDefault();
    //   let currentGuess = document.querySelector("#guessLetterValue").value;

    let currentGuess = letter.toUpperCase();
    console.log(currentGuess);

    if (hiddenWord.includes(currentGuess)) {
      document.querySelector("#letter-button-" + letter).classList.add("tried-letter-correct");
      console.log("Correct");

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
      hiddenLine = updatedLine;
      console.log(hiddenLine);

      updateGuessLine();
    } else {
      document.querySelector("#letter-button-" + letter).classList.add("tried-letter-wrong");
      console.log("Wrong");
      lives = lives - 1;
      document.querySelector("#lives-display").textContent = `LIVES: ${lives}`;
      if (lives == 0) {
        gameOver();
      }
    }
  }

  function updateGuessLine() {
    document.querySelector("#guess-line").innerHTML = "";

    document.querySelector("#guess-line").insertAdjacentHTML(
      "beforeend",
      /*HTML*/ `
<h1 id="guess-word">${hiddenLine}</h1>
  `
    );

    if (hiddenLine === hiddenWord) {
      win();
    }
  }

  function gameOver() {
    lives = 1;
    streak = 0;
    localStorage.setItem("savedStreak", streak);
    console.log(streak);

    window.removeEventListener("keydown", getKeydownLetter);

    document.querySelector("#game-over-word").textContent = `The correct word was '${hiddenWord}'`;
    document.querySelector("#fake-canvas").classList.add("hidden");
    document.querySelector("#game-over-screen").classList.remove("hidden");
  }

  function restartGame() {
    hiddenWord = "";
    hiddenLine = "_";

    document.querySelector("#streak-display").textContent = `STREAK: ${streak}🔥`;

    document.querySelector("#letters").innerHTML = "";
    document.querySelector("#guess-line").innerHTML = "";
    console.log("restarted");
    document.querySelector("#game-over-screen").classList.add("hidden");
    document.querySelector("#fake-canvas").classList.add("hidden");
    document.querySelector("#win-screen").classList.add("hidden");
    document.querySelector("#player-modes").classList.remove("hidden");
  }

  return (
    <View>
      <View style={{ display: "none" }}>
        <Text>WORD</Text>
        <Button title="PLAY AGAIN" onPress={restartGame} />
      </View>
    </View>
  );
};

export default GameComponent;
