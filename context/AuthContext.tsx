import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from 'expo-web-browser'
import AsyncStorage from "@react-native-async-storage/async-storage"
import {FIREBASE_AUTH} from "../firebaseConfig"
interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
    onLoginGoogle?: () => any;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://api.developbetterapps.com';
const AuthContext = createContext<AuthProps>({});
const provider = new GoogleAuthProvider();
export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
    WebBrowser.maybeCompleteAuthSession();
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        iosClientId: '236608320310-2q1h96m2celsha3j45hm0vpibkr1jvjc.apps.googleusercontent.com',
        androidClientId: '236608320310-vsmae1aqtrcmqt3tojll14ak4oh6nnkr.apps.googleusercontent.com',
        webClientId: '236608320310-1eedrrjia5i01dv75409hvg9esqptiqr.apps.googleusercontent.com'
      })
    const [authState, setAuthState] = useState<{
        token: string | null,
        authenticated: boolean | null
    }>({
        token: null,
        authenticated: null
    });
    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("stored:", token)
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    token: token,
                    authenticated: true
                });
            };
        }

        loadToken();
    }, [])

    useEffect(() => {
        if (response?.type === "success") {
            console.log(JSON.stringify(response, null, 2))
          const { id_token } = response.params;
          const credential = GoogleAuthProvider.credential(id_token);
          signInWithCredential(FIREBASE_AUTH, credential);
          setAuthState({
            token: id_token,
            authenticated: true
        });
        }
      }, [response]);

    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/users`,{email,password});
        } catch (e) {
            return {error: true, msg: (e as any).response.data.msg};
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/auth`,{email,password});
            setAuthState({
                token: result.data.token,
                authenticated: true
            });
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`
        
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            
            return result;
        } catch (e) {
            return {error: true, msg: (e as any).response.data.msg};
        }
    };
    
    const logout = async () => {
        //Delete token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        //Update HTTP Headers
        axios.defaults.headers.common['Authorization'] = '';

        //Reset auth state
        setAuthState({
            token: null,
            authenticated: false
        })
    }

    const LoginWithGoogle = () => {
        console.log("Hello")
        promptAsync();
    }

    const value = {
        onRegister : register,
        onLogin: login,
        onLogout: logout,
        onLoginGoogle: LoginWithGoogle,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}