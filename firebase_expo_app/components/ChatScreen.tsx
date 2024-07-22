import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const ChatScreen = () => {
    const route = useRoute();

  return (
    <View>
      <Text>{route.params.chatName}</Text>
    </View>
  )
}

export default ChatScreen