import React, { useState,useEffect,useCallback} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import ProductStore from '../../../../../store/productStore';
import UserStore from '../../../../../store/userStore';
// Screen component for the Add Product page
const AddProductScreen = () => {
  const shopID = UserStore(state=>state.getUserByIDAuto)
  const [productName, setProductName] = useState('');
  const addProduct = ProductStore((state) => state.addProduct);
  const [productPrice, setProductPrice] = useState('');
  const [categories, setCategories] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [type, setType] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [mediaPermission, setMediaPermission] = useState(null)
  const checkMediaPermission = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    setMediaPermission(permission.status === 'granted')
  }, [mediaPermission])

  useEffect(() => {
    checkMediaPermission()
  }, [checkMediaPermission])
  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const image = result.uri;
      setProductImages([...productImages, image]);
    }

  };

  const handleAddProduct = async () => {
    // Logic to add the product to your data source
    console.log('Product Name:', productName);
    console.log('Product Price:', productPrice);
    console.log('Product Description:', productDescription);
    console.log('Product Images:', productImages);

    // Upload images to https://freeimage.host/page/api
    const uploadPromises = productImages.map(image => {
      const formData = new FormData();
      formData.append('source', {
        uri: image,
        type: 'image/jpeg',
        name: image,
      });
      formData.append('action', 'upload');
      formData.append('key',"6d207e02198a847aa98d0a2a901485a5")
        return fetch('https://freeimage.host/api/1/upload', {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(data => data.image.url);
      });
    try {
      const imageUrls = await Promise.all(uploadPromises);
      console.log('Uploaded Image URLs:', imageUrls);
      addProduct({
        shopID: shopID(),
        name: productName,
        price: productPrice,
        description: productDescription,
        images: imageUrls,
        categories: categories.split(''),
        type: type,
      });

    } catch (error) {
      console.log('Image upload error:', error);
    }

    // Reset form values
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setProductImages([]);
    setCategories('');
    setType('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {productImages.length === 0 ? (
          <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
            <Text style={styles.addImageText}>Add Image</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.imageList}>
            <Image source={{ uri: productImages[0] }} style={styles.productImage} />
            {productImages.length === 1 ? (
              <TouchableOpacity style={styles.addImageOverlay} onPress={handleAddImage}>
                <Text style={styles.addImageText}>+</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </View>


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          value={productName}
          onChangeText={text => setProductName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Price</Text>
        <TextInput
          style={styles.input}
          value={productPrice}
          onChangeText={text => setProductPrice(text)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Description</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={productDescription}
          onChangeText={text => setProductDescription(text)}
          multiline
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Type</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={type}
          onChangeText={text => setType(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Product Categories</Text>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={categories}
          onChangeText={text => setCategories(text)}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonLabel}>Add Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Exporting the AddProductScreen as the main component
export default function App() {
  return <AddProductScreen />;
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  addImageText: {
    fontSize: 16,
    color: 'gray',
  },
  imageList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productImage: {
    width: '33%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  addImageOverlay: {
    width: '33%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#3669C9',
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 50,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
