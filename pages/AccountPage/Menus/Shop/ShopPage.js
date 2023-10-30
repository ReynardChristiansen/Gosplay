import React, { useState,useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet,TouchableOpacity, Image, ScrollView} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'
import Iconx from 'react-native-vector-icons/Feather'
import Icons from 'react-native-vector-icons/Ionicons'
import AddProductScreen from './ManageProduct';
import ProductStore from '../../../../store/productStore';
import UserStore from '../../../../store/userStore';
import styled from 'styled-components/native';
const SellerPage = ({ route, navigation}) => {
  const Theme = useTheme();
  const getUserShopID = UserStore(state=>state.getUserShopID)
  const getShopProducts = ProductStore(state=>state.getShopProducts)
  const [product, setProduct] = useState([])
  useEffect(()=>{
    const id = getUserShopID()
    const data = getShopProducts(id)
    setProduct(data)
  },[])
  const AddProductPage = () => {
    navigation.navigate("Add Product");
  }
  return (

    <ScrollView style={styles.container}>
      <Text style={{ marginLeft:5, fontSize:14, fontWeight:'300'}}>Alamat Toko</Text>

      <View style={styles.up}>

      <TouchableOpacity>
      <Text style={styles.leftText}>
        Kota Salatiga, Jawa Tengah
        <Icon name="down" size={15}/>
      </Text>
      </TouchableOpacity>

      <Icons name="notifications-outline" size={30}></Icons>
      </View>

      <View style={styles.profileContainer}>
            <View style={styles.innerProfile}>
              <Image
                source={require('../../../../assets/pitcure/image7.png')}
                style={{ width: 70, height: 70, borderRadius: 50 }}
              />

              <View>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginHorizontal: 25}}>Shop Larson Customs</Text>

                <View style={styles.x}>
                  <TouchableOpacity>
                  <Text style={{fontSize: 14, marginHorizontal: 25}}>Official Store</Text>
                  </TouchableOpacity>

                  <TouchableOpacity>
                  <Icons name="shield-checkmark" size={20} color="#3669C9"></Icons>
                  </TouchableOpacity>

                </View>

              </View>


            </View>
      </View>

      <View>
        <Text style={{fontSize: 23, fontWeight: 'bold', paddingTop:25}}>Categories</Text>

        <View style={styles.CategoryContainer}>

        <TouchableOpacity onPress={AddProductPage}>
        <View style={{alignItems: 'center'}}>
              <Image source={require('../../../../assets/pitcure/AddCategory.png')} style={{ width: 58, height: 58}} ></Image>
              <Text>Add</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>navigation.navigate("Manage")}>
        <View style={{alignItems: 'center', marginLeft:25}}>
              <Image source={require('../../../../assets/pitcure/ManageCategory.png')} style={{ width: 58, height: 58}}></Image>
              <Text>Manage</Text>
        </View>
        </TouchableOpacity>

        </View>

      </View>

      <View style={{marginTop:15}}>
        <View style={{marginTop:15, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginLeft:8, fontSize:18, fontWeight: 'bold'}}>Jual</Text>

            <TouchableOpacity>
              <Text style={{marginRight:8, color:"#3669C9"}}>See All</Text>
            </TouchableOpacity>

        </View>

      </View>

      <View style={styles.wrapperCardHome}>
        <ScrollView horizontal={true} style={{ marginLeft: -5,paddingVertical:20 }}>
          {product.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => navigateToProductDetail(item.id)}>
              <View style={styles.scrollViewContainer}>
                <ProductImage source={{ uri:item.images[0] }} style={styles.imageCard}/>
                <View style={{marginTop: 12, alignItems: 'flex-start'}}>
                  <Text style={{fontWeight: 'bold'}}>{item.type}</Text>
                  <Text style={{fontSize: 18}}>{item.name}</Text>
                  <Text style={{color: '#FE3A30',marginVertical:2}}>Rp. {item.price}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={require('../../../../assets/cardProduct/star.png') }style={{width: 16, marginTop: 4, marginRight: 2}}/>
                    <Text>4.6</Text>
                  </View>

                  <View>
                    <Text style={{marginLeft: 16}}>86 Review</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>))}
        </ScrollView>
      </View>

      <View style={{marginTop:15}}>
        <View style={{marginTop:15, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginLeft:8, fontSize:18, fontWeight: 'bold'}}>Sewa</Text>


        </View>

      </View>
      <ScrollView horizontal={true} style={{ marginLeft: -5,paddingVertical:20 }}>
            {product.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => navigateToProductDetail(item.id)}>
                <View style={styles.scrollViewContainer}>
                  <ProductImage source={{ uri:item.images[0] }} style={styles.imageCard}/>
                  <View style={{marginTop: 12, alignItems: 'flex-start'}}>
                    <Text style={{fontWeight: 'bold'}}>{item.type}</Text>
                    <Text style={{fontSize: 18}}>{item.name}</Text>
                    <Text style={{color: '#FE3A30',marginVertical:2}}>Rp. {item.price}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Image source={require('../../../../assets/cardProduct/star.png') }style={{width: 16, marginTop: 4, marginRight: 2}}/>
                      <Text>4.6</Text>
                    </View>

                    <View>
                      <Text style={{marginLeft: 16}}>86 Review</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>))}
        </ScrollView>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      paddingTop: 15,
      paddingLeft:10,
    },

    x:{
      flexDirection: 'row',
    },

    up:{
      borderBottomWidth: 0.9,
      borderBottomColor: '#D9D9D9',
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
    profileContainer: {
      height: 70,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // backgroundColor: 'blue'
    },
    CategoryContainer: {
      marginTop: 20,
      height: 70,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    innerProfile: {
      height: 70,
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerCardHome:{
      display: 'flex',
      marginLeft:4,
      marginTop:30,
      marginHorizontal: 15,
      alignItems: 'flex-start',
      backgroundColor: '#fff',
      elevation: 3, // Prop untuk drop shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      width: 150,
      height: 230,
      justifyContent: 'center'
      ,
      alignItems: 'center'
    },
    container: {
      flex: 1,
      marginTop: 20,
      backgroundColor: "white"
    },

    body: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 25
    },

    header: {
      paddingTop: 10,
      elevation: 2,
      marginTop: -100,
      paddingTop: 100,
      marginHorizontal: -100,
      paddingHorizontal: 100,
      backgroundColor: "white"
    },
    banner:{
      alignItems: 'center'
    },

    categoryAsset:{
      marginHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },


    TextBanner:{
      fontWeight:'bold',
      marginHorizontal: 20,
      marginVertical: 15
    },

    wrapperCardHome:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20,
      marginBottom: 5
    },


    containerReview:{
      alignItems: 'center'

    },

    containerCardRecomendation:{
      display: 'flex',
      marginBottom: 15,
      marginHorizontal: 5,
      backgroundColor: '#fff',
      borderRadius: 10,

    },

    imageCard:{
      borderRadius: 5,
      marginTop: 10
    },

    wrapperRecommendation: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 30,
      marginBottom: 5,
      flexWrap: 'wrap',
    },

    scrollViewContainer: {
      paddingHorizontal:5
    },
    gridItem: {
      flex: 1,
      margin: 5,
      backgroundColor: '#fff',
      borderRadius: 10,
      maxWidth: '50%',
    },
  });
  const ProductImage = styled.Image`
  width:${({imageSize}) => imageSize || 170}px
  height:${({imageSize}) => imageSize || 170}px
`



export default SellerPage;