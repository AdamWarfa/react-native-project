import React from "react";
import { View, Text } from "react-native";

function Header({ streak, hiScore, lives, setLives, setStreak, setHiScore }) {
  return (
    <View>
      <Text>LIVES: {lives}</Text>
      <Text>`STREAK: {streak}🔥`</Text>
      <Text>HISCORE: {hiScore}🍆</Text>
    </View>
  );
}

export default Header;
