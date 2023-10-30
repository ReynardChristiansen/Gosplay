import React, { useState,useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet,TouchableOpacity, Image} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'
import Iconx from 'react-native-vector-icons/Feather'
import Icony from 'react-native-vector-icons/Fontisto'
import Ionicon from 'react-native-vector-icons/Ionicons'


import UserStore from '../../store/userStore';
import { useNavigation } from '@react-navigation/native';
const CartPage = () => {
  const getUserByIDAuto = UserStore(state=>state.getUserByIDAuto);
  const [account,setAccount] = useState({})
  const Theme = useTheme();
  const getUserCart = UserStore((state) => state.getUserCart);
  const currentUser = UserStore((state) => state.currentUser);
  const addProductToUserCart = UserStore((state) => state.addProductToUserCart);
  const removeProductToUserCart = UserStore((state) => state.removeProductToUserCart);
  const [cart, setCart] = useState([]);
  const [price,setPrice] = useState(0)
  const navigation = useNavigation();
  useEffect(() => {
    const cartData = getUserCart(currentUser.id);
    setCart(cartData);
    // set the price of the cart
    let total = 0;
    cartData.forEach((item) => {
      total += item.price * item.quantity;
    });
    setPrice(total);
    setAccount(getUserByIDAuto())
  }, [cart, currentUser.id,addProductToUserCart,removeProductToUserCart]);

  const handleIncreaseQuantity = (product) => {
    addProductToUserCart(product,'increase')
    setCart(getUserCart(currentUser.id));
  };

  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      addProductToUserCart(product,'decrease')
      setCart(getUserCart(currentUser.id));
    }
  };

  const handleDeleteItem = (product) => {
    removeProductToUserCart(product)
    setCart(getUserCart(currentUser.id));
  };



  return (
    <View style={styles.container}>

      {/* <View style={styles.text}>
       <Iconx style={{marginRight:118, marginLeft:-70}} name="arrow-left" size={30}/>
        <Text style={{alignItems: 'center', fontSize:20, fontWeight: 'bold'}}>Keranjang</Text>
      </View>
 */}

      <View style={styles.up}>
      <Text style={styles.leftText}>Alamat Pengiriman</Text>
      <TouchableOpacity>
      <Text style={styles.rightText}>
        {account.address}
        <TouchableOpacity style={{justifyContent: 'flex-end', alignItems: 'center'}} onPress={()=>navigation.navigate("Profile")}>
          <Ionicon name="chevron-down-sharp" size={20}/>
        </TouchableOpacity>
      </Text>
      </TouchableOpacity>
      </View>


     {cart.map((item, index) => (
        <View style={styles.containerx} key={index}>
        <Image source={{uri:item.images[0]}} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.variant}>{item.description}</Text>
          <Text style={styles.price}>Rp. {item.price}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={()=>handleDecreaseQuantity(item)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={()=>handleIncreaseQuantity(item)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleDeleteItem(item)} style={styles.trashButton}>
          <Iconx name="trash" size={20} color="black" />
        </TouchableOpacity>
        </View>
      </View>
     ))}
    {/* <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
        <View style={{marginLeft: 18}}>
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
          <Text style={{fontWeight:'bold', fontSize: 17}}>Deposit Jaminan</Text>
          <Text>$1</Text>
          </View>

          <View>
            <Text>Jaminan pengembalian barang sewaan yang akan direfund</Text>
            <View style={{flexDirection: 'row',justifyContent: 'flex-start' }}>
            <Text> setelah barang sampai di seller.</Text>
            <TouchableOpacity>
              <Text style={{color: '#158fbf'}}> Pelajari</Text>
            </TouchableOpacity>
            </View>

          </View>



        </View>


      </View>
    </View> */}

    <View style={styles.box}>
      <Text style={{marginLeft:14, marginTop:10, fontSize: 16 , fontWeight:'bold'}}>Totals</Text>
      <Text style={{marginRight:20, marginTop:10 , fontSize: 16, fontWeight:'bold'}}>Rp {price}</Text>
    </View>

    <TouchableOpacity>
    <View style={styles.x}>
      <Text style={styles.n} onPress={()=>navigation.navigate('Checkout Page')}>Continue for payments</Text>
    </View>
    </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  n:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',

  },
  x:{
    backgroundColor: '#3669C9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginLeft:10,
    marginRight:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex:1,
    marginLeft:66,
    fontSize: 20,
    fontWeight: '500',
    paddingHorizontal:16,
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerx: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:6,
    marginRight:6,
  },
  box:{
    marginBottom:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  up:{
    borderWidth: 1,
    borderColor: '#D9D9D9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom:25,
  },
  leftText: {
    paddingTop: 15,
    fontSize: 14,
    paddingBottom: 15,
  },
  rightText: {
    paddingTop: 15,
    fontSize: 14,
    paddingBottom: 15,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  variant: {
    fontSize: 14,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    borderColor: 'black',
    backgroundColor: 'white',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
  },
  quantity: {
    fontSize: 16,
  },
  trashButton: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    width: 45,
    height: 45,
    paddingVertical: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default CartPage;
