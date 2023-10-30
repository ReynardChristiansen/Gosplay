import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Screen component for the Add Product page
const AddProductScreen = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImages, setProductImages] = useState([]);

  const handleAddImage = () => {
    // Logic to add image from gallery or camera
    // For now, I'm using a placeholder image URL
    const image = 'https://example.com/image.jpg';
    setProductImages([...productImages, image]);
  };

  const handleAddProduct = () => {
    // Logic to add the product to your data source
    console.log('Product Name:', productName);
    console.log('Product Price:', productPrice);
    console.log('Product Description:', productDescription);
    console.log('Product Images:', productImages);

    // Reset form values
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setProductImages([]);
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
            {productImages.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.productImage} />
            ))}
            <TouchableOpacity style={styles.addImageOverlay} onPress={handleAddImage}>
              <Text style={styles.addImageText}>+</Text>
            </TouchableOpacity>
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

      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonLabel}>Save Changes</Text>
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
