

import React, { useState,useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Image,TouchableOpacity, Modal, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from 'react-native-paper'
import Flex from '../../components/flex.js'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'
import UserStore from '../../store/userStore';
import OrderStore from '../../store/orderStore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Iconp from 'react-native-vector-icons/SimpleLineIcons'
import {Portal } from 'react-native-paper'
import { Checkbox } from 'react-native-paper';

const CheckoutPage = () => {
    const getUserCart = UserStore((state) => state.getUserCart);
    const currentUser = UserStore((state) => state.currentUser);
    const setOrders = UserStore((state) => state.setOrders);
    const [courier,setCourier] = useState('Pilih Opsi Pengiriman')
    const [payment,setPayment] = useState('Pilih Metode Pembayaran')
    const [cart, setCart] = useState([]);
    const [price,setPrice] = useState(0)
    const [deliveryPrice,setDeliveryPrice] = useState(9000)
    const [deposito,setDeposito] = useState(500000)
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [account,setAccount] = useState({})
    const getUserByIDAuto = UserStore((state) => state.getUserByIDAuto);
    const { height: screenHeight, width: screenWidth } = useWindowDimensions()
    const [checkboxStates, setCheckboxStates] = useState({});
    const [assurance,setAssurence] = useState({})
    const handleCheckboxChange = (itemId) => {
      setCheckboxStates((prevState) => ({
        ...prevState,
        [itemId]: !prevState[itemId],
      }));
      const assuranceMoney = checkboxStates[itemId]==true?100000:0
      setPrice(price+assuranceMoney)
    };

    useEffect(() => {
      const cartData = getUserCart(currentUser.id)
      setCart(cartData);
      const states = {};
      for (const item of cart) {
        states[item.id] = false;
      }
      setCheckboxStates(states);
      let totalPrice = 0
      for(const cartItem of cartData)
      {
        totalPrice += cartItem.price * cartItem.quantity
      }
      setPrice(totalPrice)
      setAccount(getUserByIDAuto())
    },[cart, currentUser.id]);

    const selectPayment = (payment) =>{
      setPayment(payment)
    }
    const selectCourier = (courier) =>{
      setCourier(courier)
    }

    const Modelbutton = () => {
      setModalVisible(true);
    }
    const sendOrder = () =>{
      console.log("send order")
      cart.map((item) => {
        setOrders(item)
        })
      navigation.navigate('Order Page')
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.body}>
            <SafeAreaView>
              <View style={styles.addressSection}>
                <Text>Alamat Pengiriman</Text>
                <Text>{account.name}</Text>
                <Text>(+62) {account.phone}</Text>
                <Text>{account.address}</Text>
            </View>

            <View style={styles.WrapperItem}>
              <View style={styles.Outlet}>
                <Flex justify="flex-start" backgroundColor="white">
                    <Image style={{width: 40, height: 40,borderWidth:1, borderColor: 'black',borderRadius: 40, marginRight:10}}
                        source={require('../../assets/ProductDetail/ShopProfile.png')} />
                    <Flex flexDirection="column" alignItems="flex-start" backgroundColor="white">
                        <Text variant="bodyMedium">Shop Larson Rent</Text>
                        <Flex alignItems="center" backgroundColor="white">
                            <Text variant="bodySmall">Official Store</Text>
                            <Ionicons name="shield-checkmark" size={20} color="#3669C9" />
                        </Flex>
                    </Flex>
                </Flex>
              </View>
              {cart.map((item,index)=>{
                  return <View key={index}>
                    <View style={styles.Product} >
                    <Flex justify="flex-start" style={{height: 90, width: 500, backgroundColor: '#fbfbfb'}}>
                          <Image style={{width: 80, height: 80, borderRadius: 1, marginRight:10, marginLeft: 15}}
                              source={{ uri:item.images[0] }} />
                          <Flex flexDirection="column" alignItems="flex-start" backgroundColor='#fbfbfb'>
                              <Text variant="bodyLarge">{item.name}</Text>
                              <Flex flexDirection="row" alignItems="center" backgroundColor='#fbfbfb'>
                                  <Text variant="bodyMedium">Rp {item.price}</Text>
                                  <Text variant="labelSmall">  x {item.quantity}</Text>
                              </Flex>

                          </Flex>
                    </Flex>
                  </View>
                  {item.type=="purchase" && (    <View style={styles.Deposit}>
                    <Flex justify="flex-start" backgroundColor="white" marginHorizontal={8} flexWrap="wrap">
                      <Checkbox
                          status={checkboxStates[item.id] ? 'checked' : 'unchecked'}
                          onPress={() => handleCheckboxChange(item.id)}
                          color="blue"
                        />
                          <Flex flexDirection="column" alignItems="flex-start" backgroundColor="white" marginHorizontal={5} >

                              <Flex flexDirection="row" marginTop={5} justifyContent= 'space-between' alignItems="center" backgroundColor="white" flexWrap="wrap"  >
                                <Text style={{fontWeight: '800', fontSize: 14}} variant="bodyMedium">Asuransi Produk</Text>
                                <Text style={{marginLeft: 160}}variant="bodySmall">Rp200.000,00</Text>
                              </Flex>

                              <Flex alignItems="center" backgroundColor="white">
                                  <Text variant="bodySmall">Melindungi produkmu dari kerusakan yang tidak disengaja, kerusakan akibat pengiriman, dan perampokan</Text>
                              </Flex>
                          </Flex>
                    </Flex>
                  </View>)}
                  {item.type=="rent" && <View style={styles.Deposit}>
                    <Flex justify="flex-start" backgroundColor="white" marginHorizontal={15}>
                    <Ionicons name="checkbox" size={20} color="grey"  />
                          <Flex flexDirection="column" alignItems="flex-start" backgroundColor="white" marginHorizontal={5} >

                              <Flex flexDirection="row" marginTop={5} justifyContent= 'space-between' alignItems="center" backgroundColor="white" flexWrap="wrap"  >
                                <Text style={{fontWeight: '800', fontSize: 14}} variant="bodyMedium">Deposit Proteksi Pengembalian Produk</Text>
                                <Text style={{marginLeft: 20}}variant="bodySmall">Rp500.000,00</Text>
                              </Flex>

                              <Flex alignItems="center" backgroundColor="white">
                                  <Text variant="bodySmall">Deposit ini merupakan sebuah jaminan terhadap pengembalian barang untuk melindungi seller dari tindakan yang tidak diinginkan</Text>
                              </Flex>
                          </Flex>
                    </Flex>
                  </View>}
                  </View>
              })}
            </View>

            <View style={styles.WrapperShipping}>

              <View style={styles.ShippingButton}>
                <View style={{height: 0.5, backgroundColor: '#a8b5ff', marginVertical: 10}}>
                </View>
                <View style={{marginVertical: 5, marginHorizontal: 15}}>
                  <Text style={{fontWeight:'bold'}} variant ="bodyMedium">Opsi Pengiriman</Text>
                </View>

                <View style={{height: 0.5, backgroundColor: 'blue', marginVertical: 10, marginHorizontal: 15, backgroundColor: '#cccccc'}}>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Courier Page',{select:selectCourier})}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginBottom: 10}}>
                  <Text variant="bodyMedium">
                    {courier}
                  </Text>

                  <Ionicons name="chevron-forward" size={20} color="black" />
                </View>
                </TouchableOpacity>

                <View style={{height: 1.2, backgroundColor: '#a8b5ff', marginVertical: 10}}>
                </View>
              </View>
            </View>

            <View style={styles.WrapperPayment}>
              <View style={styles.PaymentButton}>
                <View style={{height: 0.5, backgroundColor: '#a8b5ff', marginVertical: 10}}>
                  </View>
                  <View style={{marginVertical: 5, marginHorizontal: 15}}>
                    <Text style={{fontWeight:'bold'}} variant ="bodyMedium">Metode Pembayaran</Text>
                  </View>

                  <View style={{height: 0.5, backgroundColor: 'blue', marginVertical: 10, marginHorizontal: 15, backgroundColor: '#cccccc'}}>
                  </View>
                  <TouchableOpacity onPress={()=>navigation.navigate('Payment Page',{select:selectPayment})}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginBottom: 10}} >
                      <Text variant="bodyMedium">
                        {payment}
                      </Text>

                      <Ionicons name="chevron-forward" size={20} color="black" />
                    </View>
                  </TouchableOpacity>

                  <View style={{height: 1.2, backgroundColor: '#a8b5ff', marginVertical: 10}}>
                  </View>
              </View>
            </View>

            <View style={styles.SummaryPayment}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="receipt-outline" size={20} color="blue" style={{marginRight: 10}} />
                <Text variant="bodyLarge">Rincian Pembayaran</Text>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2}}>
                <Text>Subtotal untuk Produk</Text>
                <Text>Rp{price}</Text>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2}}>
                <Text>Subtotal Pengiriman</Text>
                <Text>Rp{deliveryPrice}</Text>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2}}>
                <Text>Subtotal Deposito</Text>
                <Text>Rp{deposito}</Text>
              </View>

              {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2}}>
                <Text>Tax</Text>
                <Text>10%</Text>
              </View> */}

              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontWeight:'700'}} variant="bodyLarge">Total Pembayaran</Text>
                <Text style={{fontWeight:'700'}} variant="bodyLarge">Rp{price+deliveryPrice+deposito}</Text>
              </View>


            </View>

            <View style={{height: 1.2, backgroundColor: '#cccc', marginTop: 10}}></View>

            <View style={styles.wrapperFooter}>
              <View style={styles.TotalBayar}>
                <Text style={{fontWeight:'normal'}} variant="bodyMedium">Total Pembayaran</Text>
                <Text style={{fontWeight:'700'}} variant="bodyLarge">Rp{price+deliveryPrice+deposito}</Text>
              </View >

            <TouchableOpacity>
                <View style={{ ...styles.x,fontWeight:'700', color: 'white', textAlign: 'center' }}>
                  <Text style={styles.n} onPress={()=>setModalVisible(true) & sendOrder()}>Continue for payments</Text>
                </View>
            </TouchableOpacity>


{/* ini buat pop up nya             */}
<Portal>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20 ,  height: 200, width:200, borderRadius:5}}>
            <View style={{borderRadius:5,alignItems: 'center', justifyContent: "center"}}>
              <Text style={{fontWeight: "bold", marginTop:35, fontSize: 18}}>
                Pesanan berhasil
              </Text>
              <Iconp name="check" size={30} style={{fontWeight: "bold", marginTop:20}}></Iconp>
              <Button onPress={() => setModalVisible(false)}>
                Lanjut
              </Button>
            </View>
          </View>
        </View>
      </Modal>
</Portal>
{/* ini buat pop up nya */}

            </View>
            </SafeAreaView>


          </View>
        </View>


      </ScrollView>

    );
  };


  const styles = StyleSheet.create({
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
    container: {
      flex: 1,
      marginTop: 20,
      backgroundColor: "white",
    },

    addressSection: {
      marginHorizontal: 15
    },

    Outlet: {
      marginTop: 20,
      marginHorizontal: 15
    },

    Product: {
      marginTop: 5,
      // marginHorizontal: 15,
      backgroundColor: 'red'
    },

    SummaryPayment:{
      marginHorizontal: 15
    },

    wrapperFooter:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
      alignItems: 'center',
      height: 65
    },

    TotalBayar: {
      backgroundColor: 'white',
      marginLeft: 30
    },

    ButtonCheckout: {
      backgroundColor: 'blue',
      flex: 1,
      marginLeft: 60,
      height: 50,
      width: 150,
      justifyContent: 'center'
    }


  });

  export default CheckoutPage;
