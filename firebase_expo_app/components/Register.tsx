import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { View, Image, KeyboardAvoidingView, Text, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import tw from 'tailwind-react-native-classnames';
import { useEffect } from 'react';
import {auth} from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [photooUrl, setPhotoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigation = useNavigation();
 const [user,setUser] = useState<any>();


  
  
    useEffect(()=>{
        setError('')
     },[email,password])

    const register = async () => {
     
        if (!email || !password || !fullName || !photooUrl) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            setLoading(true); 
            createUserWithEmailAndPassword(auth, email, password)
      .then(authUser => {
  
         updateProfile(authUser.user,{
          displayName: fullName,
          photoURL: photooUrl  
        });
        setUser(authUser)
      })
      .then(() => {
        // Registration successful
        Alert.alert('Registration Successful', 'User registered successfully!');
      })
      .catch(error => {
        Alert.alert('Registration Error', error.message);
      })
        
           
            alert('Registration successful!'); 
            
        } catch (error) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={tw`flex-1 items-center justify-center bg-white`}>
            <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png' }}
                style={{ height: 200, width: 200, marginBottom: hp(5) }}
            />
            <View style={{ width: wp(90), alignItems: 'center' }}>
                {error ? <Text style={tw`text-red-500 mb-2`}>{error}</Text> : null}
                <Input
                    placeholder='Full Name'
                    value={fullName}
                    onChangeText={(text) => setFullName(text)}
                    containerStyle={{ marginBottom: hp(2) }}
                    inputStyle={{ paddingHorizontal: 10 }}
                />
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
                    containerStyle={{ marginBottom: hp(2) }}
                    inputStyle={{ paddingHorizontal: 10 }}
                />
                <Input
                    placeholder='Phone Number'
                    value={photooUrl}
                    onChangeText={(text) => setPhotoUrl(text)}
                   
                    containerStyle={{ marginBottom: hp(3) }}
                    inputStyle={{ paddingHorizontal: 10 }}
                />
                <Button
                    title='Register'
                    onPress={register}
                    containerStyle={{ width: wp(80), marginBottom: hp(2) }}
                    buttonStyle={tw`bg-blue-500`}
                    loading={loading}
                />
                <Text style={tw`text-gray-800 text-sm`}>Already have an account? <Text onPress={()=>navigation.navigate('Login')} style={tw`text-blue-400`}>Login</Text></Text>
            </View>
        </KeyboardAvoidingView>
    );
};





export default Register;
