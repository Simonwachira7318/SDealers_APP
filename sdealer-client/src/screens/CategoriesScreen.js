import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Dummy data (replace with your actual data)
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

const dummyProducts = [
    { id: 1, name: 'Smartphone', price: 599, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhvbmV8ZW58MHx8MHx8fDA%3D' },
    { id: 2, name: 'Laptop', price: 999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wfGVufDB8fDB8fHww' },
    { id: 3, name: 'T-Shirt', price: 19, category: 'Clothing', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VCUyMFNoaXJ0fGVufDB8fDB8fHww' },
    { id: 4, name: 'Blender', price: 49, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmxlbmRlcnxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 5, name: 'Running Shoes', price: 79, category: 'Shoes', image: 'https://images.unsplash.com/photo-1595920113499-524e3f717971?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 6, name: 'Lipstick', price: 15, category: 'Beauty', image: 'https://images.unsplash.com/photo-1572189871728-91558eed9857?q=80&w=838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 7, name: 'Basketball', price: 25, category: 'Sports', image: 'https://images.unsplash.com/photo-1543971510-784779546955?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 8, name: 'Teddy Bear', price: 20, category: 'Toys', image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 9, name: 'Necklace', price: 30, category: 'Jewelry', image: 'https://images.unsplash.com/photo-1617128409082-4588725d1975?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 10, name: 'Dog Food', price: 28, category: 'Pet Supplies', image: 'https://images.unsplash.com/photo-1572879405677-4f5194657998?q=80&w=835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const CategoriesScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigation = useNavigation();

    const getProductsByCategory = (categoryName) => {
        return dummyProducts.filter(product => product.category === categoryName);
    };

    const renderCategoryItem = ({ item }) => {
        const productsInCategory = getProductsByCategory(item.name);

        return (
            <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => {
                    setSelectedCategory(item.name);
                }}
            >
                <Image source={{ uri: item.image }} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{item.name}</Text>
                <Text style={styles.productCount}>{productsInCategory.length} Products</Text>
            </TouchableOpacity>
        );
    };

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} // Navigate to ProductDetail
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Categories</Text>
                <FlatList
                    data={dummyCategories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    style={styles.categoryList}
                />

                {selectedCategory && (
                    <View style={styles.selectedCategoryContainer}>
                        <Text style={styles.categoryTitle}>{selectedCategory}</Text>
                        <FlatList
                            data={getProductsByCategory(selectedCategory)}
                            renderItem={renderProductItem}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            style={styles.productList}
                        />
                         <TouchableOpacity
                            style={styles.viewAllButton}
                            onPress={() => setSelectedCategory(null)}
                          >
                            <Text style={styles.viewAllButtonText}>View All Categories</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    container: {
        flex: 1,
        padding: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    categoryList: {
        flexGrow: 1,
    },
    categoryItem: {
        flex: 1,
        margin: 10,
        padding: 15,
        borderRadius: 12,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    categoryName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    productCount: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
    },
    selectedCategoryContainer: {
        flex: 1,
        marginTop: 20,
    },
    categoryTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2d8a8a',
        marginBottom: 15,
        textAlign: 'center',
    },
    productList: {
        flexGrow: 1,
    },
    productItem: {
        flex: 1,
        margin: 8,
        padding: 12,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#2d8a8a',
        fontWeight: 'bold',
        marginTop: 3,
    },
      viewAllButton: {
        marginTop: 20,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#2d8a8a',
        alignItems: 'center',
        alignSelf: 'center',
      },
      viewAllButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
});

export default CategoriesScreen;
