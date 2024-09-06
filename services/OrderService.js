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

    const statusCode = response.status;

    if (statusCode === 200) {
      const data = await response.json();
      return data;
    } else if (statusCode === 204) {
      // Handle 204 No Content here
      return [];
    } else {
      throw new Error(`Failed with status code ${statusCode}`);
    }
  } catch (error) {
    console.error('Error fetching ongoing orders:', error);
    throw error;
  }}

// Fetch completed orders for the user
export const fetchOngoingOrders = async () => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/api/products/ongoing`, {
      method: 'GET',
      headers: headers,
    });
    
    const statusCode = response.status;

    if (statusCode === 200) {
      const data = await response.json();
      return data;
    } else if (statusCode === 204) {
      // Handle 204 No Content here
      return [];
    } else {
      throw new Error(`Failed with status code ${statusCode}`);
    }
  } catch (error) {
    console.error('Error fetching ongoing orders:', error);
    throw error;
  }}

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

export const addOrder = async (cartItems, calculateTotalPrice) => {
  const orderRequest = {
    items: cartItems.map(item => ({
      itemId: item.id,
      quantity: item.quantity
    })),
    totalPrice: calculateTotalPrice()
  };

  try {
    const id = await AsyncStorage.getItem('userId');
    const response = await fetch('http://192.168.1.100:8080/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'userId': id
      },
      body: JSON.stringify(orderRequest)
    });

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Propagate the error back to the caller
  }
};
