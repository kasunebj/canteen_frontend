import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Retrieve the user ID from AsyncStorage
        const userId = await AsyncStorage.getItem('userId');

        if (!userId) {
          Alert.alert('Error', 'User not logged in.');
          return;
        }

        // Make the API request to fetch the completed orders
        const response = await fetch('http://192.168.1.100:8080/api/products/completed', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'userId': userId, // Pass userId in the request header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setHistoryData(data); // Update state with the fetched data
        } else {
          Alert.alert('Error', 'Failed to fetch order history');
        }
      } catch (error) {
        console.error('Error fetching history:', error);
        Alert.alert('Error', 'Unable to connect to the server.');
      } finally {
        setLoading(false); // Stop loading once the request is complete
      }
    };

    fetchHistory();
  }, []);

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.itemName}>Order ID: {item.id}</Text>
      <Text style={styles.itemPrice}>Total: ${item.totalPrice}</Text>
      <Text style={styles.itemDate}>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase History</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.historyContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Seashell color
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  historyContainer: {
    paddingBottom: 16,
  },
  historyItem: {
    backgroundColor: '#ff8b00', // LightSalmon color
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
  },
  itemDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});

export default HistoryScreen;
