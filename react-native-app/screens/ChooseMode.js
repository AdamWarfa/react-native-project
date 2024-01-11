import React from "react";
import { View, Text, Button } from "react-native";
import Header from "../components/Header";
import InGameSinglePlayer from "./InGameSinglePlayer";

function ChooseMode({ navigation, route }) {
  const { hiddenWord, hiddenLine, streak, setStreak, hiScore, setHiScore, lives, setLives } = route.params;

  async function singlePlayerMode() {
    navigation.navigate("InGameSinglePlayer");

    let hiddenWordSingle = await getHiddenWordOnline("https://random-word-api.herokuapp.com/word");
    hiddenWord = hiddenWordSingle.toUpperCase();
    console.log(hiddenWord);

    lives = hiddenWord.length + 3;
    document.querySelector("#lives-display").textContent = `LIVES: ${lives}`;

    generateAlphabet(alphabet);
    generateGuessLine();
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
      <Button title="Generate Random Word" onPress={singlePlayerMode} />
      <Button title="Choose Secret Word" onPress={multiPlayerMode} />
    </View>
  );
}

export default ChooseMode;
