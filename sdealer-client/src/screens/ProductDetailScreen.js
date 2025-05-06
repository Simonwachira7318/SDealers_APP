import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.currentProduct);
  const loading = useSelector(state => state.products.loading);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (product.ageRestricted) {
      Alert.alert(
        'Age Verification',
        'This product is age restricted. Are you 18 or older?',
        [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: () => dispatch(addToCart({ ...product, quantity })) },
        ],
        { cancelable: false }
      );
    } else {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  if (loading || !product) {
    return (
      <View style={styles.container}>
        <Text>Loading product details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        
        {product.ageRestricted && (
          <View style={styles.ageWarning}>
            <Icon name="exclamation-triangle" size={16} color="orange" />
            <Text style={styles.ageWarningText}>Age Restricted (18+)</Text>
          </View>
        )}
        
        <Text style={styles.description}>{product.description}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Icon name="minus" size={16} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => setQuantity(quantity + 1)}
          >
            <Icon name="plus" size={16} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  productImage: { width: '100%', height: 300 },
  detailsContainer: { padding: 20 },
  productName: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  productPrice: { fontSize: 20, color: 'green', marginBottom: 15 },
  ageWarning: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff8e1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  ageWarningText: { marginLeft: 5, color: 'orange' },
  description: { fontSize: 16, lineHeight: 24, marginBottom: 20 },
  quantityContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20,
  },
  quantityButton: { 
    width: 30, 
    height: 30, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  quantity: { marginHorizontal: 15, fontSize: 18 },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default ProductDetailScreen;