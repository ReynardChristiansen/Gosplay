import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import React, { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider } from 'styled-components/native'

// pages
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import Test from './pages/Test';
import Account from './pages/AccountPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutPageBeliNCustom from './pages/CheckoutPageBeliNCustom';
import ProductDetail from './pages/ProductDetail';
import SearchPage from './pages/Home/Search';
import CheckOutPage from './pages/CheckoutPage'
import PaymentPage from './pages/PaymentPage'
import ShopPage from './pages/ShopPage'
import AddProductPage from './pages/AccountPage/Menus/Shop/ManageProduct'
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
import Authenticated from './authenticated'
import Register from './pages/RegisterPage'
import Login from './pages/LoginPage'
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
            <Stack.Navigator
              initialRouteName={routesName.camera}
              backBehavior="order"
              tabBarPosition="bottom"
              activeColor="#32CC8F"
              inactiveColor='grey'
              activeBackground="#fff"
              shifting={true}
              labeled={true}
              screenOptions={{
                tabBarColor: '#fff',
              }}
            >
              <Stack.Screen
                name={"Authenticated"}
                component={Authenticated}
                model="card"
                cardStyle={{ backgroundColor: 'white' }}/>
              <Stack.Screen
                name={"Login"}
                component={Login}
                model="card"
                cardStyle={{ backgroundColor: 'white' }}/>
              <Stack.Screen
                name={"Register"}
                component={Register}
                model="card"
                cardStyle={{ backgroundColor: 'white' }}/>
            </Stack.Navigator>
          </ThemeProvider>
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}