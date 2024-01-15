import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <KeyboardAvoidingView behavior="padding">
      <SafeAreaView>
        <Text>Login</Text>
        <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
      </SafeAreaView>

      <SafeAreaView>
        <TouchableOpacity onPress={() => {}}>
          <Text>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <SafeAreaView>
        <TouchableOpacity onPress={() => {}}>
          <Text>Register</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({});
