import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/profile-picture.png')} style={styles.profileImage} />

      {/* User Info */}
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>
      <Text style={styles.phone}>+1 234 567 890</Text>

      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProfileEdit')}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Logic to handle logout
          navigation.replace('Login'); // Assuming 'Login' is the screen after logout
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    textAlign: 'center',
  },
  phone: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    padding: 16,
    backgroundColor: '#FF6347',
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default Profile;
