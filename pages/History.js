import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const historyItems = [
  {
    id: '1',
    name: 'Food Item 1',
    price: '$9.99',
    date: '2024-08-10',
  },
  {
    id: '2',
    name: 'Food Item 2',
    price: '$12.99',
    date: '2024-08-12',
  },
  {
    id: '3',
    name: 'Food Item 3',
    price: '$8.99',
    date: '2024-08-14',
  },
  // Add more history items here
];

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Fetch or load the history data
    setHistoryData(historyItems);
  }, []);

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <Text style={styles.itemDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase History</Text>
      <FlatList
        data={historyData}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.historyContainer}
      />
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