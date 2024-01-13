import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";

const GameComponent = () => {
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
