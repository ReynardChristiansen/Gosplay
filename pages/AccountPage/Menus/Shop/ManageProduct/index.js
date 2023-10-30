import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Add from './AddForm';
import Manage from './AddForm';
import MenuScreen from './AddMenu';

export default function ChatPage(){
const Stack = createStackNavigator()
  return (
    <Stack.Navigator >
      <Stack.Screen name="Manage" component={MenuScreen} />
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="Edit" component={Manage} />
    </Stack.Navigator>
  )
}
