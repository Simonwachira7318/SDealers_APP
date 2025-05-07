// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/productsSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.products);
  const [isUsingDummyData, setIsUsingDummyData] = useState(true);

  const dummyCategories = [
    { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1574144659703-1659dda2e0b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjBzY3JlZW5zfGVufDB8fDB8fHww' },
    { id: 2, name: 'Clothing', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmdzfGVufDB8fDB8fHww' },
    { id: 3, name: 'Books', image: 'https://images.unsplash.com/photo-1607473129014-0afb7ed09c3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJvb2tzfGVufDB8fDB8fHww' },
    { id: 4, name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1640723331061-1b9cba721bca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEhvbWUlMjAlMjYlMjBLaXRjaGVufGVufDB8fDB8fHww' },
    { id: 5, name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXN8ZW58MHx8MHx8fDA%3D' },
    { id: 6, name: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVhdXR5fGVufDB8fDB8fHww' },
    { id: 7, name: 'Sports', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BvcnRzfGVufDB8fDB8fHww' },
    { id: 8, name: 'Toys', image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRveXN8ZW58MHx8MHx8fDA%3D' },
    { id: 9, name: 'Jewelry', image: 'https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 10, name: 'Pet Supplies', image: 'https://images.unsplash.com/photo-1520721973443-8f2bfd949b19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBldCUyMFN1cHBsaWVzfGVufDB8fDB8fHww' },
  ];

  useEffect(() => {
    if (!isUsingDummyData) {
      dispatch(fetchCategories());
    }
  }, [dispatch, isUsingDummyData]);

  const handleToggleDataSource = () => {
    setIsUsingDummyData(!isUsingDummyData);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate('CategoryProducts', { categoryId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading && !isUsingDummyData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !isUsingDummyData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.error}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const dataSource = isUsingDummyData ? dummyCategories : categories;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Shop by Category</Text>
          <TouchableOpacity onPress={handleToggleDataSource} style={styles.dataSourceButton}>
            <Icon name={isUsingDummyData ? 'database' : 'cloud'} size={20} color="gray" />
            <Text style={styles.dataSourceText}>{isUsingDummyData ? 'Using Dummy Data' : 'Using API Data'}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={dataSource}
          renderItem={renderCategory}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: { flex: 1, padding: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
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
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  dataSourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  dataSourceText: {
    marginLeft: 5,
    fontSize: 12,
    color: 'gray',
  },
});

export default HomeScreen;