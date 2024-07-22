import { View, Text } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Input, Button, Icon } from 'react-native-elements';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import tw from 'tailwind-react-native-classnames';
import { StatusBar } from 'expo-status-bar';

const AddChat = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState<string>('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new Chat',
    });
  }, [navigation]);

  const createChat = async () => {
    try {
      const collectionRef = collection(db, 'chats');
      const docRef = await addDoc(collectionRef, {
        chatName: input,
      });

      console.log('Chat document written with ID: ', docRef.id);
      navigation.goBack();
      return docRef.id;
    } catch (error) {
      console.error('Error adding document: ', error);
      throw new Error('Failed to create chat');
    }
  };

  return (
    <View style={[{ width: wp(89), marginTop: hp(4) }, tw`mx-auto`]}>
      <StatusBar style='light' />
      <Input
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text) => setInput(text)} // Use onChangeText instead of onChange for Input component
        leftIcon={<Icon name='wechat' type='antdesign' size={24} color={'black'} />}
      />
      <Button title='Create a new Chat' onPress={createChat} />
    </View>
  );
};

export default AddChat;
