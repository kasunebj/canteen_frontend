import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from './CartSlice';

export default function CartScreen() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <View>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ margin: 10 }}>
              <Text>{item.name} x {item.quantity}</Text>
              <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
            </View>
          )}
        />
      ) : (
        <Text>Your cart is empty</Text>
      )}
      <Button title="Clear Cart" onPress={handleClearCart} />
    </View>
  );
}
