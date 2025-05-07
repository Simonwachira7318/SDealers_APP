import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/productsSlice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.products);
  const [isUsingDummyData, setIsUsingDummyData] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');
  const insets = useSafeAreaInsets();
  const [animatedValues] = useState({
    Home: new Animated.Value(1),
    Categories: new Animated.Value(1),
    Cart: new Animated.Value(1),
    Account: new Animated.Value(1),
    'Customer Care': new Animated.Value(1),
  });

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

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    Animated.spring(animatedValues[tabName], {
      toValue: 1.05,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(animatedValues[tabName], {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
  };

  if (loading && !isUsingDummyData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error && !isUsingDummyData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  const dataSource = isUsingDummyData ? dummyCategories : categories;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
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
      </SafeAreaView>

      {/* Bottom Menu */}
      <View style={[styles.bottomMenu, { bottom: insets.bottom }]}>
        {['Home', 'Categories', 'Cart', 'Account', 'Customer Care'].map(tabName => {
          let iconName = '';
          switch (tabName) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Categories':
              iconName = 'list-ul';
              break;
            case 'Cart':
              iconName = 'shopping-cart';
              break;
            case 'Account':
              iconName = 'user';
              break;
            case 'Customer Care':
              iconName = 'headset';
              break;
            default:
              iconName = 'question';
          }

          return (
            <TouchableOpacity
              key={tabName}
              style={styles.menuItem}
              onPress={() => handleTabPress(tabName)}
            >
              <Animated.View style={{ transform: [{ scale: animatedValues[tabName] }] }}>
                <Icon
                  name={iconName}
                  size={20}
                  color={activeTab === tabName ? 'white' : 'rgba(255,255,255,0.7)'}
                />
              </Animated.View>
              <Text
                style={{
                  color: activeTab === tabName ? 'white' : 'rgba(255,255,255,0.7)',
                  fontSize: 12,
                  marginTop: 3,
                  textAlign: 'center'
                }}
              >
                {tabName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d8a8ad6',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'trasparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: 'white' }, // Title color
  list: { paddingBottom: 70, paddingHorizontal: 10 }, // Space for bottom menu, and horizontal padding
  categoryCard: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
  },
  categoryImage: { width: 100, height: 100, borderRadius: 50 },
  categoryName: { marginTop: 10, fontWeight: '600', color: '#333' },
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
  bottomMenu: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: 'teal',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
