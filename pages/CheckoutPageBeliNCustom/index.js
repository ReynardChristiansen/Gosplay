
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper'
import Flex from '../../components/flex.js'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'
  import { Checkbox } from 'react-native-paper';

const CheckoutPageBeliNCustom = () => {
    const [checked, setChecked] = React.useState(false);

    const productPrice = 1500000;
    const assurancePrice = 200000;
    const TotalAsyu = 0;
    const [totalPrice, setTotalPrice] = useState(productPrice);
    const [AssyuPrice, setAssyuPrice] = useState(TotalAsyu);

    const handleCheckboxChange = () => {
      setChecked(!checked);
      setTotalPrice(checked ? productPrice : productPrice + assurancePrice);
      setAssyuPrice(checked ? TotalAsyu : TotalAsyu + assurancePrice);
    };

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.body}>
            <SafeAreaView>
              <View style={styles.addressSection}>
                <Text>Alamat Pengiriman</Text>
                <Text>Patrick Wen</Text>
                <Text>(+62)819907728</Text>
                <Text>Perumahan Poris Indah Jaya Selalu, Blok A6. Kota Salatiga, Jawa Tengah</Text>
            </View>

            <View style={styles.WrapperItem}>
              <View style={styles.Outlet}>
                <Flex justify="flex-start" backgroundColor="white">
                    <Image style={{width: 40, height: 40,borderWidth:1, borderColor: 'black',borderRadius: 40, marginRight:10}}
                        source={require('../../assets/ProductDetail/ShopProfile.png')} />
                    <Flex flexDirection="column" alignItems="flex-start" backgroundColor="white">
                        <Text variant="bodyMedium">Shop Larson Cosplay</Text>
                        <Flex alignItems="center" backgroundColor="white">
                            <Text variant="bodySmall">Official Store</Text>
                            <Ionicons name="shield-checkmark" size={20} color="#3669C9" />
                        </Flex>
                    </Flex>
                </Flex>
              </View>
              <View style={styles.Product}>
                <Flex justify="flex-start" style={{height: 90, width: 500, backgroundColor: '#fbfbfb'}}>
                      <Image style={{width: 80, height: 80, borderRadius: 1, marginRight:10, marginLeft: 15}}
                          source={require('../../assets/cardProduct/image1462.png')} />
                      <Flex flexDirection="column" alignItems="flex-start" backgroundColor='#fbfbfb'>
                          <Text variant="bodyLarge">Jinx Cannon</Text>
                          <Flex flexDirection="row" alignItems="center" backgroundColor='#fbfbfb'>
                              <Text variant="bodyMedium">Rp1.500.000,00</Text>
                              <Text style={{marginLeft: 175}} variant="labelSmall">x1</Text>
                          </Flex>

                      </Flex>
                </Flex>
              </View>
              <View style={styles.Deposit}>
                <Flex justify="flex-start" backgroundColor="white" marginHorizontal={8} flexWrap="wrap">
                <Checkbox
                     status={checked ? 'checked' : 'unchecked'}
                     onPress={handleCheckboxChange}
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
              </View>
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

                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginBottom: 4}}>
                  <Text variant="bodyMedium">
                    Pilih Opsi Pengiriman
                  </Text>

                  <Ionicons name="chevron-forward" size={20} color="black" />
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

                  <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginBottom: 4}}>
                    <Text variant="bodyMedium">
                      Pilih Metode Pembayaran
                    </Text>

                    <Ionicons name="chevron-forward" size={20} color="black" />
                  </TouchableOpacity>

                  <View style={{height: 1.2, backgroundColor: '#a8b5ff', marginVertical: 10}}>
                  </View>


              </View>

            </View>

            <View style={styles.SummaryPayment}>
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <Ionicons name="receipt-outline" size={20} color="blue" style={{marginRight: 10}} />
                <Text variant="bodyLarge">Rincian Pembayaran</Text>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2}}>
                <Text>Subtotal untuk Produk</Text>
                <Text>Rp1.500.000,00</Text>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2}}>
                <Text>Subtotal Pengiriman</Text>
                <Text>Rp0,00</Text>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2}}>
                <Text>Subtotal Asuransi</Text>
                <Text variant="bodyMedium">{`Rp${AssyuPrice.toFixed(2)}`}</Text>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{ fontWeight: '700' }} variant="bodyLarge">Total Pembayaran</Text>
              <Text style={{ fontWeight: '700' }} variant="bodyLarge">{`Rp${totalPrice.toFixed(2)}`}</Text>
              </View>



            </View>
            <View style={{height: 1.2, backgroundColor: '#cccc', marginTop: 10}}></View>

            <View style={styles.wrapperFooter}>
              <View style={styles.TotalBayar}>
                <Text style={{fontWeight:'normal'}} variant="bodyMedium">Total Pembayaran</Text>
                <Text style={{ fontWeight: '700' }} variant="bodyLarge">{`Rp${totalPrice.toFixed(2)}`}</Text>
              </View >

            <TouchableOpacity style={styles.ButtonCheckout}>
              <View >
                <Text style={{fontWeight:'700', color: 'white', textAlign: 'center'}} variant="bodyLarge" >Buat Pesanan</Text>

              </View>
            </TouchableOpacity>


            </View>


            </SafeAreaView>


          </View>
        </View>


      </ScrollView>

    );
  };

  const styles = StyleSheet.create({
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
      justifyContent: 'center'
    }


  });

  export default CheckoutPageBeliNCustom ;

