import {useState,useEffect} from 'react';
import styled from 'styled-components/native';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { Searchbar } from 'react-native-paper';
import ProductStore from '../../store/productStore';
import { useNavigation } from '@react-navigation/native';
const SearchPage = () => {
  const productSearch = ProductStore(state=>state.searchProducts)
  const [products,setProducts] = useState([])
  const [searchQuery,setSearchQuery] = useState('')

  const onChangeSearch = query => setSearchQuery(query);

  const searchProductByName = () => {
    const result = productSearch(searchQuery);
    setProducts(result)
  }
  const navigation = useNavigation()


  useEffect(()=>{setProducts(productSearch(searchQuery))},[])

  const renderGridItem = ({item}) => {
    return(
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigateToProductDetail(item.id)}
        >
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
          </TouchableOpacity>
  )};
  const navigateToProductDetail = (id) => {
    navigation.navigate('Product Detail', { id });
  }
  return (
    <View>

      {/* Search */}
      <Searchbar
        placeholder="Cari Produk yang Anda Inginkan"
        onChangeText={onChangeSearch}
        value={searchQuery}
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
        onIconPress={() => searchProductByName()}
        onSubmitEditing={() => searchProductByName()}
      />

      {/* SEARCH RESULTS */}
      <View>
        <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', marginHorizontal: 20,
            marginVertical: 15}}>
          <Text style={{
            fontSize: 18,
            fontWeight:'bold'
            }}>Hasil Pencarian</Text>
        </View>
        <View style={styles.wrapperRecommendation}>
            <FlatList
              data={products}
              renderItem={renderGridItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
            />
        </View>
        <View style={styles.wrapperRecommendation}>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCardRecomendation:{
    display: 'flex',
    marginBottom: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3, // Prop untuk drop shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 150,
    height: 230,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center'
  },

  imageCard:{
    borderRadius: 5,
    marginTop: 10
  },

  wrapperRecommendation:{
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: 10
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
export default SearchPage;
