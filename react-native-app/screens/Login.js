import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
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
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const user = response.user;
        console.log(user.email, " is registered");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const user = response.user;
        console.log(user.email, " is logged in");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <SafeAreaView>
        <Text>Login</Text>
        <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
      </SafeAreaView>

      <SafeAreaView>
        <TouchableOpacity onPress={handleLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <SafeAreaView>
        <TouchableOpacity onPress={handleSignUp}>
          <Text>Register</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({});
