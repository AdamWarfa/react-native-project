import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import ChooseMode from "./ChooseMode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("ChooseMode");
        console.log(user.email, " is logged in");
      } else {
        console.log("User is logged out");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        navigation.navigate("ChooseMode");

        const user = response.user;
        console.log(user.email, " is registered");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        console.log(user.email, " is logged in");
        navigation.navigate("ChooseMode");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.homeScreen}>
      <SafeAreaView>
        <Text style={styles.homeTitle}>Login</Text>
        <TextInput style={styles.input} placeholder="Type Email..." placeholderTextColor="#333" value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput style={{ ...styles.input, marginBottom: "30%" }} placeholder="Type Password..." placeholderTextColor="#333" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
      </SafeAreaView>

      <SafeAreaView>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.homeButton}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <SafeAreaView>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.homeButton}>Register</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#222222",
    height: "100%",
  },
  header: {
    marginTop: 30,
  },

  homeScreen: {
    backgroundColor: "#222222",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    color: "#a0d8b3",
    fontSize: 60,
    textAlign: "center",
    marginTop: -150,
    marginBottom: 250,
  },
  text: {
    color: "#a0d8b3",
    fontSize: 20,
    textAlign: "center",
  },
  alphabet: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 100,
  },
  letter: {
    backgroundColor: "#222222",
    padding: 18,
    alignItems: "center",
    color: "#a0d8b3",
    fontSize: 30,
  },
  homeTitle: {
    color: "#a0d8b3",
    fontSize: 30,
    textAlign: "center",
    marginTop: -150,
    marginBottom: 80,
  },
  homeButton: {
    color: "#222222",
    backgroundColor: "#a0d8b3",
    fontSize: 20,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 25,
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    width: 250,
  },

  guessedLetters: {
    backgroundColor: "#555555",
    padding: 10,
    margin: 8,
    alignItems: "center",
    color: "#EEEEEE",
    fontSize: 30,
    borderRadius: 10,
    overflow: "hidden",

    pointerEvents: "none",
  },

  wrongLetters: {
    backgroundColor: "#222222",
    padding: 18,
    alignItems: "center",
    color: "#999999",
    fontSize: 30,
    opacity: 0.5,
    pointerEvents: "none",
  },

  hiddenLine: {
    color: "#a0d8b3",
    fontSize: 40,
    textAlign: "center",
    marginTop: "20%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: "#999999",
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    fontSize: 20,
    textAlign: "center",
    width: 250,
  },
});

export default Login;
