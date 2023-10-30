import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import React, { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components/native'

// pages
import HomePage from './pages/Home';
import ChatPage from './pages/ChatPage';
import WishlistPage from './pages/Wishlist';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/AccountPage/Menus/Orders/OrderPage'

//navigators
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import HomeIcon from './assets/icons/HomeIcon.js'
import OrderIcon from './assets/icons/OrderIcon'
import WishlistIcon from './assets/icons/WishlistIcon'
//utilities
import theme from './theme'
import { routesName } from './routes'
import { LogBox } from 'react-native'

//react native paper
import { Provider } from 'react-native-paper'


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

export default function App({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    'Jakarta-m': require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
    'Jakarta-sb': require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'Jakarta-b': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      setTimeout(async () => {
        await SplashScreen.hideAsync()
      }, 100000)
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, fontFamily: 'Jakarta-m'}}>
      <NavigationContainer onLayout={onLayoutRootView} style={{ backgroundColor:'white' }}>
        <Provider>
          <ThemeProvider theme={theme}>
          <Tab.Navigator
              initialRouteName={routesName.camera}
              backBehavior="order"
              tabBarPosition="bottom"
              activeColor="#32CC8F"
              inactiveColor="grey"
              activeBackground="#fff"
              shifting={true}
              labeled={true}
              screenOptions={{
                tabBarColor: '#fff',
              }}
            >
              <Tab.Screen
                name={routesName.home}
                component={HomePage}
                options={{
                  headerShown: false,
                  tabBarLabel: routesName.home,
                  tabBarIcon: ({ color, focused }) => (
                    <HomeIcon
                      name="home"
                      color={"black"}
                      backgroundColor={focused ? '#32CC8F' : 'grey'}
                      size={26}
                      style={{ outlineColor: focused ? '#32CC8F' : 'transparent' }}
                    />
                  ),
                }}
                model="card"
                cardStyle={{ backgroundColor: 'white' }}
              />
              <Tab.Screen
                name={routesName.chat}
                component={ChatPage}
                options={{
                  headerShown: false,
                  tabBarLabel: routesName.chat,
                  tabBarIcon: ({ color, focused }) => (
                    <Ionicons
                      name="ios-chatbox-ellipses-outline"
                      color={color}
                      size={26}
                      style={{ outlineColor: focused ? '#32CC8F' : 'transparent' }}
                    />
                  ),
                }}
                model="card"
                cardStyle={{ backgroundColor: 'white' }}
              />
              <Tab.Screen
                name={routesName.wishlist}
                component={WishlistPage}
                options={{
                  headerShown: false,
                  tabBarLabel: "Wishlist",
                  tabBarIcon: ({ color, focused }) => (
                    <WishlistIcon
                      name="home"
                      color={focused ? '#32CC8F' : 'grey'}
                      size={26}
                      style={{ outlineColor: focused ? '#32CC8F' : 'transparent' }}
                    />
                  ),
                }}
                model="card"
                cardStyle={{ backgroundColor: 'white' }}
              />
              <Tab.Screen
                name={routesName.cart}
                component={OrderPage}
                options={{
                  headerShown: true,
                  tabBarLabel: "Order",
                  tabBarIcon: ({ color, focused }) => (
                    <OrderIcon
                      name="home"
                      color={focused ? '#32CC8F' : 'grey'}
                      size={26}
                      style={{ outlineColor: focused ? '#32CC8F' : 'transparent' }}
                    />
                  ),
                }}
                model="card"
                cardStyle={{ backgroundColor: 'white' }}
              />
              <Tab.Screen
                name={routesName.account}
                component={AccountPage}
                options={{
                  tabBarLabel: routesName.account,
                  tabBarIcon: ({ color, focused }) => (
                    <AntDesign
                      name="user"
                      color={focused ? '#32CC8F' : 'grey'}
                      size={26}
                      style={{ outlineColor: focused ? '#32CC8F' : 'transparent' }}
                    />
                  ),
                }}
                model="card"
                cardStyle={{ backgroundColor: 'white' }}
              />
            </Tab.Navigator>
          </ThemeProvider>
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
