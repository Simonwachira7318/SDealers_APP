import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductListScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('latest');

  useEffect(() => {
    dispatch(fetchProducts({ categoryId, searchQuery, sortOption }));
  }, [dispatch, categoryId, searchQuery, sortOption]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      {item.ageRestricted && (
        <View style={styles.ageBadge}>
          <Text style={styles.ageText}>18+</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search products..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
      </View>

      <View style={styles.sortContainer}>
        <Text>Sort by:</Text>
        <TouchableOpacity onPress={() => setSortOption('latest')}>
          <Text style={sortOption === 'latest' ? styles.activeSort : styles.sortOption}>Latest</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortOption('priceLow')}>
          <Text style={sortOption === 'priceLow' ? styles.activeSort : styles.sortOption}>Price Low</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortOption('priceHigh')}>
          <Text style={sortOption === 'priceHigh' ? styles.activeSort : styles.sortOption}>Price High</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortOption('name')}>
          <Text style={sortOption === 'name' ? styles.activeSort : styles.sortOption}>Name A-Z</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text>Loading products...</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: { flex: 1, height: 40 },
  searchIcon: { marginLeft: 10 },
  sortContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginVertical: 10,
    alignItems: 'center',
  },
  sortOption: { paddingHorizontal: 10 },
  activeSort: { paddingHorizontal: 10, fontWeight: 'bold', color: 'blue' },
  list: { paddingBottom: 20 },
  productCard: { 
    flex: 1, 
    margin: 5, 
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: { width: '100%', height: 120, borderRadius: 5 },
  productName: { marginTop: 5, fontWeight: '500' },
  productPrice: { color: 'green', fontWeight: 'bold' },
  ageBadge: { 
    position: 'absolute', 
    top: 5, 
    right: 5, 
    backgroundColor: 'red', 
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  ageText: { color: 'white', fontSize: 10 },
});

export default ProductListScreen;