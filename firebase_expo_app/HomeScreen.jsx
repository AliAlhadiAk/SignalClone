import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native'; 
import { Store } from 'redux';
import { setLoggeddIn, setUser } from './usersSlice';
import CustomListitem from './components/CustomListitem';
import { Avatar } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'


const HomeScreen = () => {



  const userRedux = useSelector((store ) => store.user.users); 
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const Logout = () => {
    auth.signOut().then(() => {
      dispatch(setLoggeddIn(false))
      navigation.navigate('Login')
      dispatch(setUser(undefined))
    })
  }
  const enterChat = (id,chatName) => {
    navigation.navigate('Chat',{
      id,
      chatName
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 20 }}>
          {/* Example Avatar component */}
      
              <Avatar
            onPress={() => {
              Logout();
            }}
            rounded
            
            source={{
              uri:
                'https://example.com/default-avatar.png' 
            }}
          />
         
        
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableOpacity
            style={{ paddingHorizontal: 10 }}
            onPress={() => {
      
            }}
          >
            <AntDesign name="camerao" size={24} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingHorizontal: 10 }}
            onPress={() => navigation.navigate('AddChat')}
          >
            <SimpleLineIcons name="pencil" size={24} color={'black'} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    console.log(user)
  },[])

  const [userFirebase, setUserFirebase] = useState(null); 
  const user = useSelector((state) => state.user.isLoggedIn)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser ) => {
      if(currentUser){
        setUserFirebase(currentUser);
        dispatch(setLoggeddIn(true))
        console.log(currentUser)
      }
    });

    return unsubscribe; 
  }, []);

  useEffect(() => {
    if (!user) {
     
      navigation.navigate('Login'); 
    }
  }, [userFirebase]);

  const handleLogout = () => {
    auth.signOut().then(() => {
     
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 mt-0 pt-0`}>
      <ScrollView>
        <CustomListitem enterChat={enterChat}/>
        
        
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default HomeScreen;
