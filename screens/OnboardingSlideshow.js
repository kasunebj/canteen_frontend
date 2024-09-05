import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const OnboardingSlideshow = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to the Onboarding Slideshow</Text>
    <Button
      title="Create Account"
      onPress={() => navigation.navigate('OnboardingCreateAccount')}
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

export default OnboardingSlideshow;
