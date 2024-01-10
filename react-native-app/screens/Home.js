import React from "react";
import { View, Text, Button } from "react-native";
import MyTabs from "../components/Nav.js";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate("Details")} />
      <MyTabs />
    </View>
  );
};

export default HomeScreen;
