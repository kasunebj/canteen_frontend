import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants/Config'; // Import base URL

const getHeaders = async () => {
  const userId = await AsyncStorage.getItem('userId');
  return {
    'Content-Type': 'application/json',
    'userId': userId,
  };
};

// Fetch completed orders for the user
export const fetchCompletedOrders = async () => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/api/products/completed`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch completed orders');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Save user data
export const saveLoginData = async (userId) => {
  try {
    await AsyncStorage.setItem('userId', userId.toString());
  } catch (error) {
    console.error('Error saving login data:', error);
  }
};

export const fetchItems = async () => {
  const response = await fetch('http://192.168.1.100:8080/items'); // Double-check if `/items` is correct

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();
  return json; // Return fetched items
};
