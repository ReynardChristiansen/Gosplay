import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import ProductStore from '../../../store/productStore.js';

const OnePiecePage = () => {
  const navigation = useNavigation();

  const Search = () => {
    navigation.navigate('Search Result');
  };

  const navigateToProductDetail = (id) => {
    navigation.navigate('Product Detail', { id });
  };

  const data = [
    {
        id: 16,
        name: 'Harry Potter Robe',
        price: 'Rp. 8.000.000',
        rating: '4.6',
        reviewCount: 86,
          image: 'https://cdn.media.amplience.net/i/partycity/687855_01?$large$&fmt=auto&qlt=default',
      },{
        id: 18,
        name: 'Doctor Strange Cloak',
        price: 'Rp. 2.200.000',
        rating: '4.6',
        reviewCount: 86,
          image: 'https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/2840058489247?fmt=jpeg&qlt=90&wid=608&hei=608',
      },{
        id: 4,
        name: 'Spider-Man Mask',
        price: 'Rp. 5.000.000',
        rating: '4.6',
        reviewCount: 86,
          image: 'https://i.etsystatic.com/19750816/r/il/54d25d/4456776541/il_fullxfull.4456776541_nsns.jpg',
      },
  ];

  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigateToProductDetail(item.id)}
    >
      <ProductImage source={ {uri: item.image }} />
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <View style={styles.ratingContainer}>
          <Image source={require('../../../assets/cardProduct/star.png')} style={styles.starIcon} />
          <Text>{item.rating}</Text>
        </View>
        <Text>{item.reviewCount} Review</Text>
      </View>
    </TouchableOpacity>
  );
  const Header = () => {
    return (
      <View style={styles.body}>
      <View>
        <Searchbar
          placeholder="Cari Produk yang Anda Inginkan"
          style={styles.searchBar}
          onIconPress={Search}
          onPressIn={() => navigation.navigate('Search Result')}
        />
      </View>

      <View style={styles.banner}>
        {/* Render your banner component here */}
      </View>
        <Text variant="titleLarge" style={styles.title}>
          One Piece
        </Text>
    </View>
    );
  }
  const FlatListView = () =>{
    return (
      <FlatList style={styles.wrapperRecommendation}
        data={data}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={Header}
      />
    )
  }
  return (
    <FlatListView style={styles.container}/>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchBar: {
    marginBottom: 20,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FAFAFA',
    borderColor: '#FAFAFA',
    borderRadius: 10,
    flexDirection: 'row-reverse',
  },
  banner: {
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  title: {
    fontWeight: 'bold',
  },
  wrapperRecommendation: {
    flex: 1,
    marginHorizontal: 10,
  },
  gridItem: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    maxWidth: '50%',
  },
  itemContent: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    color: '#FE3A30',
    marginVertical: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    width: 16,
    marginTop: 4,
    marginRight: 2,
  },
});

const ProductImage = styled.Image`
  width: ${({ imageSize }) => imageSize || 170}px;
  height: ${({ imageSize }) => imageSize || 170}px;
`;

export default OnePiecePage;
