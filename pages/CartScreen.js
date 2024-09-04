import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, addItem, deleteItem, clearCart } from './CartSlice';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CartScreen() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(deleteItem(id));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addItem(item));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleAddOrder = async () => {
    const orderRequest = {
      items: cartItems.map(item => ({
        itemId: item.id,
        quantity: item.quantity
      })),
      totalPrice: calculateTotalPrice()
    };

    try {
      const response = await fetch('https://your-backend-api.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderRequest)
      });

      if (response.ok) {
        // Order successfully placed
        console.log('Order placed successfully');
        handleClearCart();
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
          <Icon name="remove-circle-outline" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
          <Icon name="add-circle-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
        <Icon name="trash-bin-outline" size={30} color="#ff0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <Text>Total Price: ${calculateTotalPrice().toFixed(2)}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Add Order" onPress={handleAddOrder} />
            <Button title="Clear Cart" onPress={handleClearCart} color="#ff0000" />
          </View>
        </>
      ) : (
        <Text>Your cart is empty</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
