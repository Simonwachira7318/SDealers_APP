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
  const [isUsingDummyData, setIsUsingDummyData] = useState(true); // Control dummy data

  const dummyCategories = [
    { id: 1, name: 'Electronics', image: 'https://via.placeholder.com/150/FFC0CB/000000?Text=Electronics' },
    { id: 2, name: 'Clothing', image: 'https://via.placeholder.com/150/ADD8E6/000000?Text=Clothing' },
    { id: 3, name: 'Books', image: 'https://via.placeholder.com/150/90EE90/000000?Text=Books' },
    { id: 4, name: 'Home & Kitchen', image: 'https://via.placeholder.com/150/FFA07A/000000?Text=Home&Kitchen' },
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