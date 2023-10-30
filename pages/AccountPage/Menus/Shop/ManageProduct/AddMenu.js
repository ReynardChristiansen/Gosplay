import React,{useState,useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Svg, { Path } from 'react-native-svg';
const Stack = createStackNavigator();
import UserStore from '../../../../../store/userStore';
import ProductStore from '../../../../../store/productStore';

const AddProductScreen = ({ navigation }) => {
  const [products, setProduct] = useState([])
  const getUserShopID = UserStore(state=>state.getUserShopID)
  const getShopProducts = ProductStore(state=>state.getShopProducts)
  useEffect(()=>{
    const id = getUserShopID()
    const data = getShopProducts(id)
    setProduct(data)
  },[])

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={() => console.log(`Edit ${item.name}`)}>
      <Image source={{uri:item.image}} style={styles.cardImage} />
      <Text style={styles.cardName}>{item.name}</Text>
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Edit',  item.id)}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FlatList
          data={products}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={[styles.addButtonContainer, { backgroundColor: '#3669C9' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
        <Svg
            width={32}
            height={32}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M12 5v14M5 12h14" />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 16, // Add spacing between header and content
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 16,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#3669C9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 60,
    height: 60,
    backgroundColor: 'gray',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
