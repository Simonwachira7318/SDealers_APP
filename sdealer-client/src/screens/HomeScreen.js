import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/productsSlice';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.products.categories);
  const loading = useSelector(state => state.products.loading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => navigation.navigate('CategoryProducts', { categoryId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  list: { paddingBottom: 20 },
  categoryCard: { 
    flex: 1, 
    margin: 5, 
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
  },
  categoryImage: { width: 100, height: 100, borderRadius: 50 },
  categoryName: { marginTop: 10, fontWeight: '600' },
});

export default HomeScreen;