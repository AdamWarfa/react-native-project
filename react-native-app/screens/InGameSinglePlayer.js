function InGameSinglePlayer({ navigation, route }) {
  const { hiddenWord, hiddenLine, streak, setStreak, hiScore, setHiScore, lives, setLives } = route.params;

  return (
    <View style={{ display: "none" }}>
      <View>
        <View></View>
        <View>
          <TextInput secureTextEntry={true} placeholder="Choose a secret word..." />
          <Button title="SUBMIT" onPress={setHiddenWord} />
        </View>
      </View>
    </View>
  );
}

export default InGameSinglePlayer;
