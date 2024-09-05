import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCompletedOrders } from '../services/OrderService'; // Import the API service

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchCompletedOrders(); // Call the service function
        setHistoryData(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch order history');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.itemName}>Order ID: {item.id}</Text>
      <Text style={styles.itemPrice}>Total: Rs.{item.totalPrice}</Text>
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
