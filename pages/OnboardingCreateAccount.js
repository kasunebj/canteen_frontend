import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const OnboardingCreateAccount = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Create Your Account</Text>
    <Button
      title="Go to Dashboard"
      onPress={() => navigation.navigate('Dashboard')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default OnboardingCreateAccount;
