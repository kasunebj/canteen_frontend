import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutUs = () => (
  <View style={styles.container}>
    <Text style={styles.title}>About Us</Text>
    <Text style={styles.subtitle}>Address:</Text>
    <Text style={styles.text}>123 Main Street, City, Country</Text>
    <Text style={styles.subtitle}>Email:</Text>
    <Text style={styles.text}>contact@cafeteria.com</Text>
    <Text style={styles.subtitle}>Contact Number:</Text>
    <Text style={styles.text}>+123 456 7890</Text>
    <Image source={require('../assets/aboutUs.jpeg')} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF5EE', // Seashell color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 100, // Makes the image circular
  },
});

export default AboutUs;
