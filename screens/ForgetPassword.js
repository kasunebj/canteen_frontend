import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ForgetPassword = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Forget Password</Text>
  </View>
);

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

export default ForgetPassword;
