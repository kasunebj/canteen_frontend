import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {/* Add your login form or UI elements here */}
      <Button title="Login" onPress={() => navigation.replace('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Login;
