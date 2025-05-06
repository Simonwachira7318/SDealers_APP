import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../store/cartSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ id: itemId, quantity: newQuantity }));
    } else {
      handleRemoveItem(itemId);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.quantity - 1)}>
            <Icon name="minus" size={16} color="#888" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, item.quantity + 1)}>
            <Icon name="plus" size={16} color="#888" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Icon name="shopping-cart" size={50} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.list}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  emptyCart: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#888', marginVertical: 20 },
  shopButton: { 
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
  },
  shopButtonText: { color: 'white', fontWeight: 'bold' },
  list: { paddingBottom: 100 },
  cartItem: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    marginBottom: 10, 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  itemImage: { width: 60, height: 60, borderRadius: 5 },
  itemDetails: { flex: 1, marginLeft: 10 },
  itemName: { fontWeight: '500' },
  itemPrice: { color: 'green', marginVertical: 5 },
  quantityContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 5,
  },
  quantity: { marginHorizontal: 10 },
  removeButton: { padding: 10 },
  totalContainer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: { color: 'white', fontWeight: 'bold' },
});

export default CartScreen;