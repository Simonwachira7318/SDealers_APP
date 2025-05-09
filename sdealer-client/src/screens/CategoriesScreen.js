import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    const fadeAnim = useState(new Animated.Value(0))[0];

    const getProductsByCategory = (categoryName) => {
        return dummyProducts.filter(product => product.category === categoryName);
    };

    const handleCategoryPress = (categoryName) => {
        setSelectedCategory(categoryName);
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    const renderCategoryItem = ({ item }) => {
        const productsInCategory = getProductsByCategory(item.name);

        return (
            <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(item.name)}
            >
                <View style={styles.categoryImageContainer}>
                    <Image source={{ uri: item.image }} style={styles.categoryImage} />
                </View>
                <Text style={styles.categoryName}>{item.name}</Text>
                <Text style={styles.productCount}>{productsInCategory.length} Products</Text>
            </TouchableOpacity>
        );
    };

    const renderProductItem = ({ item }) => (
        <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity
                style={styles.productItem}
                onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            >
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Shop Categories</Text>
            </View>

            {!selectedCategory ? (
                <FlatList
                    data={dummyCategories}
                    renderItem={renderCategoryItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.categoryList}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Animated.View style={[styles.selectedCategoryContainer, { opacity: fadeAnim }]}>
                    <View style={styles.categoryHeader}>
                        <TouchableOpacity 
                            style={styles.backButton} 
                            onPress={() => setSelectedCategory(null)}
                        >
                            <Text style={styles.backButtonText}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.categoryTitle}>{selectedCategory}</Text>
                    </View>
                    
                    <FlatList
                        data={getProductsByCategory(selectedCategory)}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.productList}
                        showsVerticalScrollIndicator={false}
                    />
                </Animated.View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        backgroundColor: 'teal',
        paddingTop: 45,
        paddingBottom: 20,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    categoryList: {
        paddingHorizontal: 12,
        paddingBottom: 20,
    },
    categoryItem: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0d9488',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    categoryImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0fdfa',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        padding: 10,
        borderWidth: 2,
        borderColor: '#ccfbf1',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f766e',
        textAlign: 'center',
        marginBottom: 4,
    },
    productCount: {
        fontSize: 12,
        color: '#64748b',
        textAlign: 'center',
    },
    selectedCategoryContainer: {
        flex: 1,
        paddingHorizontal: 12,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    backButton: {
        padding: 8,
        marginRight: 12,
    },
    backButtonText: {
        fontSize: 24,
        color: '#0d9488',
        fontWeight: 'bold',
    },
    categoryTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0f766e',
        flex: 1,
        textAlign: 'center',
    },
    productList: {
        paddingBottom: 20,
    },
    productItem: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    productImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 12,
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
        textAlign: 'center',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0d9488',
    },
});

export default CategoriesScreen;