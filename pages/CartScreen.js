import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, addItem, deleteItem, clearCart } from './CartSlice';
import Icon from 'react-native-vector-icons/Ionicons'; // Or any other icon set

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
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text>Your cart is empty</Text>
      )}
      <TouchableOpacity onPress={handleClearCart} style={styles.clearCartButton}>
        <Text>Clear Cart</Text>
      </TouchableOpacity>
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
  clearCartButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ccc',
  },
});
