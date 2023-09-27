import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from 'react'
import { API_URL, useAuth } from '../context/AuthContext';
import { StatusBar } from "expo-status-bar";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {onLogin, onRegister} = useAuth();



  const login = async () => {
    //  ! in TypeScript is used to indicate that a variable/property is non-null and non-undefined. It is called the non-null assertion operator. 
    // When you use ! after a variable or property, you are telling the TypeScript compiler that you are certain that the value will not be null or undefined. 
    const result = await onLogin!(email,password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  //We automatically call the login after a successfull registration
  const register = async () => {
    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("../../assets/icon.png")} />  */}
      <Image style={styles.image} source={{uri: 'https://galaxies.dev/img/logos/logo--blue.png'}} /> 
      {/* <StatusBar style="auto" /> */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text: string) => setPassword(text)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress={login} >
        <Text>LOGIN</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress={register}>
        <Text>SIGN UP</Text> 
      </TouchableOpacity> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    marginBottom: 10,
    marginTop: 40,
    width:100,
    height:100,
    resizeMode: 'center',
    // backgroundColor:'red'
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    // height: 30,
    // marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#FF1493",
  },
});

export default Login