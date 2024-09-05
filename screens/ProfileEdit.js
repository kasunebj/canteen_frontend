import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileEdit = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      {/* Add your form or other UI elements here */}
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

export default ProfileEdit;
