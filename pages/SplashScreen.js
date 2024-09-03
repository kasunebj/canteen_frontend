import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to Home screen
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/cafe_logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Cafeteria</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 24,
  },
});
