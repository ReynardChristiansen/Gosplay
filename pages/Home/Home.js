import {useState,useEffect} from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, Text } from 'react-native-paper'
import Flex from '../../components/flex.js'
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../theme.js';
import Bannerong from '../../assets/Banner/gratisOngkir.svg';
import BannerSewa from '../../assets/Banner/sewa.svg';
import BannerCustom from '../../assets/Banner/custom.svg';
import styled from 'styled-components/native';
// import BannerCustom from '../../assets/Banner/customBaju.svg';
// import BannerSection from './BannerSection';
// import NewReleaseSection from './NewReleaseSection';
// import SectionNavigation from './SectionNavigation';
// import CategorySection from './CategorySection';
// import RecommendationSection from './RecommendationSection';
import ProductStore from '../../store/productStore.js';
const HomePage = () => {
  const Theme = useTheme();
  const [popularProduct,setPopularProduct] = useState([])
  const [rentProducts,setRentProducts] = useState([])
  const [purchaseProducts,setPurchaseProducts] = useState([])
  const getPopularList = ProductStore(state=>state.getPopularList);
  const getRentProducts = ProductStore(state=>state.getRentProducts);
  const getPurchaseProducts = ProductStore(state=>state.getPurchaseProducts);
  const navigation = useNavigation();

  const Search = () => {
    navigation.navigate('Search Result');
  }
  useEffect(() => {
    setPopularProduct(getPopularList())
    setRentProducts(getRentProducts())
    setPurchaseProducts(getPurchaseProducts())
  }, []);
  const navigateToProductDetail = (id) =>{
    navigation.navigate('Product Detail', {id})
  }
  const RenderRecommendationSection = () => {
    const rows = Math.ceil(popularProduct.length / 2);
    const renderedRows = [];

    for (let i = 0; i < rows; i++) {
      const startIndex = i * 2;
      const endIndex = Math.min(startIndex + 2, popularProduct.length);
      const rowProducts = popularProduct.slice(startIndex, endIndex);

      const renderedRow = (
        <Flex key={i} justifyContent="space-evenly"  style={{ backgroundColor:'white' }}>
          {rowProducts.map((product, index) => (
          <TouchableOpacity key={index} onPress={() => navigateToProductDetail(item.id)}>
          <View>
            <ProductImage source={{ uri:product.images[0],width:150,height:150 }} style={{ borderRadius:5 }}/>
            <View style={{marginTop: 12, alignItems: 'flex-start',width:'90%'}}>
              <Text style={{fontWeight: 'bold'}}>{product.type}</Text>
              <Text style={{fontSize: 18,flexWrap:'wrap'}}>{product.name}</Text>
              <Text style={{color: '#FE3A30',marginVertical:2}}>Rp. {product.price}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={require('../../assets/cardProduct/star.png') }style={{width: 16, marginTop: 4, marginRight: 2}}/>
                <Text>4.6</Text>
              </View>

              <View>
                <Text style={{marginLeft: 16}}>86 Review</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
          ))}
        </Flex>
      );

      renderedRows.push(renderedRow);
    }

    return renderedRows;
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.body}>
        {/* header */}
        <View>
          <View style={styles.header}>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <View style={{flex: 1}}>
                  <Text variant ="titleSmall" style={{color: 'C8C8CB'}}>Alamat Pengiriman</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text variant ="titleMedium" style={{ fontWeight: "Bold"}}>Kota Salatiga, Jawa Tengah</Text>
                  <TouchableOpacity style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Icon name="chevron-down-sharp" size={20}/>
                  </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={{width: 45, heigth: 70, justifyContent: 'flex-end', alignItems:'center'}}>
                  <Icon name="cart-outline" size={30} onPress={()=>navigation.navigate('Cart Page')}/>
                </TouchableOpacity>

            </View>
          </View>

        </View>

        {/* content */}
        <View>
          <Searchbar
          placeholder="Cari Produk yang Anda Inginkan"
          // onChangeText={onChangeSearch}
          // value={searchQuery}
          style={{
            marginVertical: 20,
            marginHorizontal: 10,
            paddingHorizontal: 15,
            backgroundColor: '#FAFAFA',
            borderColor: '#FAFAFA',
            borderRadius: 10,
            flexDirection: 'row-reverse', // Reverse the direction of the SearchBar container
            // Move the icon to the start (right side)
          }}
          onIconPress={()=>Search()}
          onPressIn={()=>navigation.navigate('Search Result')}
          // onSubmitEditing={() => get_ingredients_list()}
        />


        </View>

      <View style={styles.banner}>
        <Bannerong width="200%" height={170}/>
      </View>

      <View >
          <View>
            <Text variant="titleLarge" style={styles.TextBanner}>
              Kategori
            </Text>
          </View>

          <View style={styles.categoryAsset}>
            <View>
              <Image source={require('../../assets/category/fullset.png')} style={{marginHorizontal: 15, width: 60, height: 60}}/>
              <Text variant ="titleSmall" style={{textAlign: 'center'}}>Full Set</Text>
            </View>

          <View>
             <Image source={require('../../assets/category/prop.png')} style={{marginHorizontal: 15, width: 60, height: 60}}/>
             <Text variant ="titleSmall" style={{textAlign: 'center'}}>Prop</Text>
          </View>

         <View>
           <Image source={require('../../assets/category/wig.png')} style={{marginHorizontal: 15, width: 60, height: 60}}/>
           <Text variant ="titleSmall" style={{textAlign: 'center'}}>Wig</Text>
         </View>

         <View>
           <Image source={require('../../assets/category/one.jpg')} style={{marginHorizontal: 15, width: 60, height: 60}}/>
           <Text variant ="titleSmall" style={{textAlign: 'center'}}>One Piece</Text>
         </View>


          </View>
      </View>

      <View>
        <TouchableOpacity style={{alignItems: 'center', marginVertical: 20}}>
        {/* <Image source={require('../../assets/Banner/sewa.jpg')}/> */}
          <BannerSewa width="200%" height={170}/>
        </TouchableOpacity>

      </View>
      <View style={styles.wrapperCardHome}>
        <ScrollView horizontal={true} style={{ marginLeft: -5,paddingVertical:20 }}>
          {rentProducts.map((item, index) => (
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
                    <Image source={require('../../assets/cardProduct/star.png') }style={{width: 16, marginTop: 4, marginRight: 2}}/>
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

          {/* Section Custom  */}

      <View>
        <TouchableOpacity style={{alignItems: 'center', marginVertical: 20}}>
        {/* <Image source={require('../../assets/Banner/sewa.jpg')}/> */}
          <BannerCustom width="200%" height={170}/>
        </TouchableOpacity>

      </View>


      <View style={styles.wrapperCardHome}>
        <ScrollView horizontal={true} style={{ marginLeft: -5,paddingVertical:20 }}>
          {purchaseProducts.map((item, index) => (
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
                    <Image source={require('../../assets/cardProduct/star.png') }style={{width: 16, marginTop: 4, marginRight: 2}}/>
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


      {/* Recommendation Section */}
      <View>
          <View style={{display: 'flex', alignItems:"center", flexDirection:'row', justifyContent: 'space-between', marginHorizontal: 20,
              marginVertical: 15}}>
            <Text variant="titleLarge" style={{fontWeight:"bold"}}>Rekomendasi Untuk mu</Text>
              <TouchableOpacity>
                <Text variant="titleMedium" >Lihat Semua</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.wrapperRecommendation}>
          <Flex style={{ marginLeft: -5,marginTop:10, backgroundColor:'#fff'}}>
            <View style={styles.containerCardRecomendation}>
                <ProductImage source={require('../../assets/cardProduct/pop1.png')} style={styles.imageCard}/>
                <View style={{marginTop: 12, alignItems: 'flex-start'}}>
                  {/* <Text style={{fontWeight: 'bold'}}>Sewa</Text> */}
                  <Text style={{fontSize: 18}}>Jinx Cannon</Text>
                  <Text style={{color: '#FE3A30',marginVertical:2}}>Rp. 1.500.000</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={require('../../assets/cardProduct/star.png') }style={{width: 16, marginTop: 4, marginRight: 2}}/>
                    <Text>4.6</Text>
                  </View>

                  <View>
                    <Text style={{marginLeft: 16}}>86 Review</Text>

                  </View>
                </View>
            </View>

            <View style={styles.containerCardRecomendation}>
                <ProductImage source={require('../../assets/cardProduct/pop1.png')} style={styles.imageCard}/>
                <View style={{marginTop: 12, alignItems: 'flex-start'}}>
                  {/* <Text style={{fontWeight: 'bold'}}>Sewa</Text> */}
                  <Text style={{fontSize: 18}}>Jinx Cannon</Text>
                  <Text style={{color: '#FE3A30',marginVertical:2}}>Rp. 1.500.000</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={require('../../assets/cardProduct/star.png') }style={{width: 16, marginTop: 4, marginRight: 2}}/>
                    <Text>4.6</Text>
                  </View>

                  <View>
                    <Text style={{marginLeft: 16}}>86 Review</Text>

                  </View>
                </View>
             </View>
            </Flex>
          </View>
      </View>
      <RenderRecommendationSection/>

      {/* <View style={styles.wrapperCardHome}>
        <ScrollView horizontal={true} style={{paddingVertical:20 }}>
          {rentProducts.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => navigateToProductDetail(item.id)}>
              <View>
                <ProductImage source={{ uri:item.images[0],width:150,height:150 }} style={{ borderRadius:5 }}/>
                <View style={{marginTop: 12, alignItems: 'flex-start',width:'90%'}}>
                  <Text style={{fontWeight: 'bold'}}>{item.type}</Text>
                  <Text style={{fontSize: 18,flexWrap:'wrap'}}>{item.name}</Text>
                  <Text style={{color: '#FE3A30',marginVertical:2}}>Rp. {item.price}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={require('../../assets/cardProduct/star.png') }style={{width: 16, marginTop: 4, marginRight: 2}}/>
                    <Text>4.6</Text>
                  </View>

                  <View>
                    <Text style={{marginLeft: 16}}>86 Review</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>))}
        </ScrollView>
      </View>  */}


    </View>

  </View>

  </ScrollView>
  );
};

const styles = StyleSheet.create({
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

  // containerCardHome:{
  //   display: 'flex',
  //   marginHorizontal: 15,
  //   alignItems: 'flex-start',
  //   backgroundColor: '#fff',
  //   elevation: 3, // Prop untuk drop shadow
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 4,
  //   width: 150,
  //   height: 230,
  //   justifyContent: 'center',
  //   borderRadius: 10
  //   ,
  //   alignItems: 'center'
  // },

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

  wrapperRecommendation:{
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    // marginHorizontal: 10
  },
  scrollViewContainer: {
    paddingHorizontal:5
  }
});

const ProductImage = styled.Image`
  width:${({imageSize}) => imageSize || 170}px
  height:${({imageSize}) => imageSize || 170}px
`

export default HomePage;
