//IMPORTS
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// IMPORT PAGES
import AccountSettings from './AccountMenus';
import ProfileSettings from './Menus/Profile/Profile';
import MyOrder from './Menus/Orders/OrderPage';
import MyShop from './Menus/Shop/ShopPage';
import ManageProducts from './Menus/Shop/ManageProduct';

export default function AccountPage() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Account Main"
        component={AccountSettings}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileSettings}
      />
      <Stack.Screen
        name="My Order"
        component={MyOrder}
      />
      <Stack.Screen
        name="My Shop"
        component={MyShop}
      />
      <Stack.Screen
        name="Add Product"
        component={ManageProducts}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}