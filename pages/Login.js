import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import { saveLoginData, getLoginData, clearLoginData } from './AuthUtils'; // Import from the correct path

const Login = ({ navigation,setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.100:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        // Login successful
        setIsLoggedIn(true); // Set to true after successful login

        const userId = json.userId; // Example user ID from server after successful login
        const userType= json.userType;
        await clearLoginData();
        await saveLoginData(userId,userType);

        navigation.replace('Home'); 
        // Navigate to the home screen or dashboard
        navigation.navigate('HomeScreen', { user: json.user });
      } else {
        // Handle login errors
        Alert.alert("Login Failed", json.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      Alert.alert("Login Failed", "Unable to connect to the server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* <Button style={styles.button} title="Login" onPress={handleLogin} /> */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ff8033',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Login;
