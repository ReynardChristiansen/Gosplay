import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChatScreen from './chat';
import MenuScreen from './menu';


export default function ChatPage(){
const Stack = createStackNavigator()
  return (

    <Stack.Navigator >
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Chat Main" component={ChatScreen} />
    </Stack.Navigator>

  )
}
