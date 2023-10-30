import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Searchbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import ProductStore from '../../../store/productStore.js';

const FullSetPage = () => {
  const navigation = useNavigation();

  const Search = () => {
    navigation.navigate('Search Result');
  };

  const navigateToProductDetail = (id) => {
    navigation.navigate('Product Detail', { id });
  };

  const data = [
    {
      id: 1,
      name: 'Violet Evergarden Costume',
      price: 'Rp. 1.500.000',
      rating: '4.6',
      reviewCount: 86,
        image: 'https://images.tokopedia.net/img/cache/900/product-1/2019/12/9/4927628/4927628_93619023-4cee-4fc5-8f2c-cdab4a14bd7e_790_790.jpg',
    },{
        id: 3,
        name: 'Wonder Woman Costume',
        price: 'Rp. 1.800.000',
        rating: '4.6',
        reviewCount: 86,
        image: 'https://www.fastcosplay.com/media/catalog/product/cache/1/image/21fe682235e1f648bffa330829dff638/b/a/batman-v-superman-dawn-of-justice-diana-prince-wonder-woman-cosplay-costume_1.jpg',
      },{
        id: 5,
        name: 'Elsa Costume',
        price: 'Rp. 1.200.000',
        rating: '4.6',
        reviewCount: 86,
        image: 'https://th.bing.com/th/id/OIP.0Sw21c4QSQq_uqay8QI_mgHaKl?w=197&h=281&c=7&r=0&o=5&pid=1.7',
      },{
        id: 7,
        name: 'Harley Quinn Costume',
        price: 'Rp. 1.700.000',
        rating: '4.6',
        reviewCount: 86,
        image: 'https://images.halloweencostumes.com/products/38657/1-1/deluxe-suicide-squad-harley-quinn-costume1.jpg',
      },{
        id: 9,
        name: 'Black Widow Costume',
        price: 'Rp. 1.700.000',
        rating: '4.6',
        reviewCount: 86,
          image: 'https://images.halloweencostumes.com.au/products/38697/1-1/womens-deluxe-civil-war-black-widow-costume.jpg',
      },{
        id: 11,
        name: 'Stormtrooper Costume',
        price: 'Rp. 1.400.000',
        rating: '4.6',
        reviewCount: 86,
          image: 'https://images.halloweencostumes.com/products/85896/1-1/child-stormtrooper-costume.jpg',
      },{
        id: 13,
        name: 'Princess Leia Costume',
        price: 'Rp. 1.100.000',
        rating: '4.6',
        reviewCount: 86,
          image: 'https://m.media-amazon.com/images/I/718EuKyj+GL.jpg',
      },{
        id: 15,
        name: 'Batman Costume',
        price: 'Rp. 1.900.000',
        rating: '4.6',
        reviewCount: 86,
          image: 'ttps://media.very.co.uk/i/very/47MFU_SQ1_0000000029_MULTI_MDf1?$300x400_retinamobilex2$',
      },{
        id: 19,
        name: 'Mikasa Ackerman Costume',
        price: 'Rp. 1.700.000',
        rating: '4.6',
        reviewCount: 86,
          image: 'https://ae01.alicdn.com/kf/S42eca0fb0d104321a03fb1f503d5d6c9p.jpg?width=800&height=791&hash=1591',
      },
  ];
  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => navigateToProductDetail(item.id)}
    >
      <ProductImage source={{ uri: item.image }} />
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <View style={styles.ratingContainer}>
          <Image
            source={require('../../../assets/cardProduct/star.png')}
            style={styles.starIcon}
          />
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
          Full Set
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
    flex:1,
    marginTop: 20,
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

export default FullSetPage;