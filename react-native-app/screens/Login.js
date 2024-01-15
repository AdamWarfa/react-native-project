import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

const Login = () => {
  return (
    <KeyboardAvoidingView behavior="padding">
      <SafeAreaView>
        <Text>Login</Text>
        <TextInput
          placeholder="Email"
          // value="" onChangeText={text =>}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          // value="" onChangeText={text =>}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({});
