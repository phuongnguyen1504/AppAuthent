import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainNavigator from './navigations/MainNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <AuthProvider>
      <MainNavigator/>
    </AuthProvider>
  );
}

// function HomeScreen() {
//   return (
//     <Tab.Navigator initialRouteName='screens' screenOptions={{headerShown:false}}>
//       <Tab.Screen name="Home" component={Home} options={{title:'Home Page', tabBarIcon: ({size, color})=>(<FontAwesome name="home" size={size} color={color} />)}}/>
//       <Tab.Screen name="Profile" component={Profile} options={{title:'Profile Page', tabBarIcon: ({size, color})=>(<FontAwesome name="envelope" size={size} color={color} />)}}/>
//     </Tab.Navigator>
//   )
// }


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
