import React from "react";
import { View, Text } from "react-native";

function Header({ styles, streak, hiScore, lives }) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>LIVES: {lives}❤️</Text>
      <Text style={styles.text}>STREAK: {streak}🔥</Text>
      <Text style={styles.text}>HISCORE: {hiScore}🍆</Text>
    </View>
  );
}

export default Header;
