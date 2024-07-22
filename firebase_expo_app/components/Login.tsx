import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Image, KeyboardAvoidingView, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import tw from 'tailwind-react-native-classnames';
import {signInWithEmailAndPassword} from'firebase/auth'
import { auth } from '../firebaseConfig';
import { Auth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { UseSelector } from 'react-redux';
import { UseDispatch } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import {setLoggeddIn} from '../usersSlice'
import AddChat from './AddChat';



const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.user.isLoggedIn)
 
     useEffect(() => {
        const subscribe = onAuthStateChanged(auth,(currentUser : any) => {
            if(currentUser){
                
                dispatch(setLoggeddIn(true))
                if(user){
                    navigation.navigate('Home')
                }
            }
        })
     })
  
    const handleLogout = () => {
      auth.signOut().then(() => {
       
      }).catch((error) => {
        console.error('Error signing out:', error);
      });
    };

    const signIn = async () => {
        // Validate email and password
        if (!email || !password) {
            setError('Please fill in all fields.');
            if(error){
                setTimeout(() => {
                    setError('')
                }, 1000);
            }
            return;
        }

        try {
            setLoading(true); 
            
           signInWithEmailAndPassword(auth,email,password)
           .then(user=>dispatch(setUser(user.providerId)))
           if(user){
            navigation.navigate('Home')
           }
           console.log(user)

           
           

        } catch (error) {
            setError('Invalid email or password.'); 
        } finally {
            setLoading(false); 
        }
    };
    useEffect(()=>{
       setError('')
    },[email,password])

    return (
        <KeyboardAvoidingView behavior='padding' style={tw`flex-1 items-center justify-center bg-white`}>
            <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png' }}
                style={{ height: 200, width: 200, marginBottom: hp(5) }}
            />
            <View style={{ width: wp(90), alignItems: 'center' }}>
                {error ? <Text style={tw`text-red-500 mb-2`}>{error}</Text> : null}
                <Input
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    containerStyle={{ marginBottom: hp(2) }}
                    inputStyle={{ paddingHorizontal: 10 }}
                />
                <Input
                    placeholder='Password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    containerStyle={{ marginBottom: hp(3) }}
                    inputStyle={{ paddingHorizontal: 10 }}
                />
                <Button
                    title='Login'
                    onPress={signIn}
                    containerStyle={{ width: wp(80), marginBottom: hp(2) }}
                    buttonStyle={tw`bg-blue-500`}
                    loading={loading}
                />
                <Button
                    title='Register'
                    onPress={() => navigation.navigate('SignUp')}
                    type='outline'
                    containerStyle={{ width: wp(80) }}
                    buttonStyle={tw`border-blue-500`}
                    titleStyle={{ color: '#007BFF' }}
                />
            </View>
        </KeyboardAvoidingView>
    );
};


export default LoginScreen;
