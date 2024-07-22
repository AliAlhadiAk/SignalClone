import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import { useNavigation } from 'expo-router';
import { setUser } from './usersSlice';
import { Avatar } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
import AddChat from './components/AddChat';
import ChatScreen from './components/ChatScreen';
export default function App() {

    
 
  const Stack = createNativeStackNavigator();



  return (
    <NavigationContainer>
      <Provider store={store}>
      <Stack.Navigator initialRouteName='Home'>
        
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerStyle: { backgroundColor: '#2C6BED' },
              headerTitleStyle: { color: 'white' },
              headerTintColor: 'white',
              headerTitleAlign: 'center',
            }}
          />
       
         <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{
             title:"Signal",
             headerStyle:{backgroundColor : "#fff"},
             headerTitleStyle:{color:'black'},
             headerTintColor:'black',
             headerTitleAlign:'center',
             
            }}
          />
    
        <Stack.Screen
          name='SignUp'
          component={Register}
          options={{
            headerStyle: { backgroundColor: '#2C6BED' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerBackTitleVisible: false, 
          }}
        />
                <Stack.Screen
          name='AddChat'
          component={AddChat}
          options={{
            headerStyle: { backgroundColor: '#2C6BED' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            presentation:'modal'
          }}
          
        />
        <Stack.Screen name='Chat' component={ChatScreen}/>
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
 
}
