// screens/DetailsScreen.js

import React from "react";
import { View, Text, Button } from "react-native";

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Details Screen</Text>
      <Button title="Go back to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default ProfileScreen;
