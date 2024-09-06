import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchOngoingOrders } from '../services/OrderService'; // Import the API service

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchOngoingOrders(); // Call the service function
        if (data.length !== 0) {
          setHistoryData(data);
        }
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
      <Text style={styles.title}>Ongoing Orders</Text>
      {loading ? (
    <Text style={styles.loadingText}>Loading...</Text>
  ) : historyData.length === 0 ? ( // Check if the historyData array is empty
    <Text style={styles.emptyText}>No Ongoing Orders At The Moment</Text> // Display this message if it's empty
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
    backgroundColor: '#fff', // Background color
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // black color
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#FF4500', // Theme color
    textAlign: 'center',
    marginTop: 20,
  },
  historyContainer: {
    paddingBottom: 16,
  },
  historyItem: {
    backgroundColor: '#FF4500', // Theme color
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Text color for the item name
  },
  itemPrice: {
    fontSize: 16,
    color: '#fff', // Text color for the item price
  },
  itemDate: {
    fontSize: 14,
    color: '#fff', // Text color for the item date
    marginTop: 4,
  },emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
    fontWeight: '500',
  },
});

export default HistoryScreen;
