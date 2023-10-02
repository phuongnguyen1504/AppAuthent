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
import LoginWithGoogle from "../components/LoginWithGoogle";
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from 'expo-web-browser'
import {GoogleAuthProvider, onAuthStateChanged, signInWithCredential} from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage"
import {FIREBASE_AUTH} from "../firebaseConfig"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState<any>(undefined);
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   iosClientId: '236608320310-2q1h96m2celsha3j45hm0vpibkr1jvjc.apps.googleusercontent.com',
  //   androidClientId: '236608320310-vsmae1aqtrcmqt3tojll14ak4oh6nnkr.apps.googleusercontent.com',
  //   webClientId: '236608320310-1eedrrjia5i01dv75409hvg9esqptiqr.apps.googleusercontent.com'
  // })
  //Firebase
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: '236608320310-2q1h96m2celsha3j45hm0vpibkr1jvjc.apps.googleusercontent.com',
    androidClientId: '236608320310-vsmae1aqtrcmqt3tojll14ak4oh6nnkr.apps.googleusercontent.com',
    webClientId: '236608320310-1eedrrjia5i01dv75409hvg9esqptiqr.apps.googleusercontent.com'
  })
  const getLocalUser = async () => {
    try {
      // setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);
    } catch (e) {
      console.log(e, "Error getting local user");
    } finally {
      // setLoading(false);
    }
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential);
    }
  }, [response]);

  React.useEffect(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        console.log("🚀 ~ file: Login.tsx:61 ~ unsub ~ user:", user)
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      } else {
        console.log("user not authenticated");
      }
    });
    return () => unsub();
  }, []);
  const {onLogin, onRegister, onLoginGoogle} = useAuth();
  WebBrowser.maybeCompleteAuthSession();

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
  
  // useEffect(() => {
  //   handleSignInWithGoogle();
  // }, [response])
  // async function handleSignInWithGoogle() {
  //   const user = await AsyncStorage.getItem("@user");
  //   if (!user) {
  //     if (response?.type == "success") {
  //       await getUserInfo(response?.authentication?.accessToken)
  //     }
  //   } else {
  //     setUserInfo(JSON.parse(user));
  //   }
  // }
  // const getUserInfo = async (token: any) => {
  //   if (!token) return;
  //   try {
  //     const response = await fetch(
  //       "https://www.googleapis.com/userinfo/v2/me",
  //       {
  //         headers: {Authorization: `Bearer ${token}`}
  //       }
  //     );
  //     const user = await response.json()
  //     await AsyncStorage.setItem('@user', JSON.stringify(user));
  //     setUserInfo(user);
  //   } catch(error) {

  //   }
  // }
  // useEffect(() => {
  //   const unsub = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
  //     if (user) {
  //       console.log(JSON.stringify(user, null, 2))
  //       setUserInfo(user)
  //     } else {
  //       console.log('else ')
  //     }
  //   })
  //   return () => unsub();
  // },[])

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
      <LoginWithGoogle promptAsync={onLoginGoogle}/>
      <TouchableOpacity style={styles.loginBtn} onPress={()=> {AsyncStorage.removeItem('@user')}}>
        <Text>Delete</Text> 
      </TouchableOpacity> 
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
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