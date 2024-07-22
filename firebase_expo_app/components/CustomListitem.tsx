import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type Prop = {
  id: number;
  chatName: string;
  enterChat: any;
 
};

const CustomListitem = ({ id, chatName, enterChat }: Prop) => {
  const user = useSelector((state: any) => state.user.users);
  const [chats, setChats] = useState<any[]>([]);
  const [chatNames, setChatNames] = useState<any>();  // State to store fetched chat documents

  useEffect(()=>{
    console.log(chatNames)
  })
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'chats'));
        const getById = (id:string) => {
          const docId = doc(db,'chats',id)
          const Doc = getDoc(docId)
          setChatNames(Doc)
        }
        const chatsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setChats(chatsData);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []); // Fetch chats on component mount

  return (
    <View>
      {chats.map((chat) => (
        <ListItem key={chat.id} onPress={() => enterChat(chat.id,chat.chatName)}>
          <Avatar
            rounded
            source={{
              uri:  'https://placekitten.com/200/200', // Example placeholder URL
            }}
          />
          <ListItem.Content style={{ width: wp(100) }}>
            <ListItem.Title style={tw`font-bold`}>{chat.data.chatName}</ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
              {chat.data.lastMessage}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

export default CustomListitem;
