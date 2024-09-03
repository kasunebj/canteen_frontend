// SellerUpload.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SellerUpload = ({ navigation }) => {
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleUpload = () => {
    const newFood = {
      id: Math.random().toString(),
      name: foodName,
      price,
      ingredients: description,
      image: { uri: image }, // Set image as a URI
    };

    // Upload food to the backend or store in state (you can modify this part to fit your architecture)
    navigation.navigate('Home', { newFood });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload New Food</Text>
      <TextInput
        placeholder="Food Name"
        value={foodName}
        onChangeText={setFoodName}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>Pick an image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      <Button title="Upload" onPress={handleUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF5EE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  imagePicker: {
    backgroundColor: '#FFA07A',
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default SellerUpload;
