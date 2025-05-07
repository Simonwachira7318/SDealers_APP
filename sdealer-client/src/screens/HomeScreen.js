import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    ActivityIndicator,
    Modal,
    Pressable
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '../store/productsSlice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { categories, products, loading, error } = useSelector(state => state.products);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [showFilters, setShowFilters] = useState(false);
    const [isUsingDummyData, setIsUsingDummyData] = useState(false);

    // Dummy data fallback
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
        { id: 5, name: 'Smartphone', price: 599, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhvbmV8ZW58MHx8MHx8fDA%3D' },
        { id: 6, name: 'Laptop', price: 999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wfGVufDB8fDB8fHww' },
        { id: 7, name: 'T-Shirt', price: 19, category: 'Clothing', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VCUyMFNoaXJ0fGVufDB8fDB8fHww' },
        { id: 8, name: 'Blender', price: 49, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmxlbmRlcnxlbnwwfHwwfHx8MA%3D%3D' },
        { id: 9, name: 'Smartphone', price: 599, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhvbmV8ZW58MHx8MHx8fDA%3D' },
        { id: 10, name: 'Laptop', price: 999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wfGVufDB8fDB8fHww' },
        { id: 11, name: 'T-Shirt', price: 19, category: 'Clothing', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VCUyMFNoaXJ0fGVufDB8fDB8fHww' },
        { id: 12, name: 'Blender', price: 49, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmxlbmRlcnxlbnwwfHwwfHx8MA%3D%3D' },
        { id: 13, name: 'Smartphone', price: 599, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhvbmV8ZW58MHx8MHx8fDA%3D' },
        { id: 14, name: 'Laptop', price: 999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wfGVufDB8fDB8fHww' },
        { id: 15, name: 'T-Shirt', price: 19, category: 'Clothing', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VCUyMFNoaXJ0fGVufDB8fDB8fHww' },
        { id: 416, name: 'Blender', price: 49, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1585237672814-8f85a8118bf6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmxlbmRlcnxlbnwwfHwwfHx8MA%3D%3D' },
    ];

    useEffect(() => {
        if (!isUsingDummyData) {
            dispatch(fetchCategories());
            dispatch(fetchProducts());
        }
    }, [dispatch, isUsingDummyData]);

    const toggleDataSource = () => {
        setIsUsingDummyData(!isUsingDummyData);
    };

    const filteredProducts = () => {
        const data = isUsingDummyData ? dummyProducts : products;

        return data.filter(product => {
            // Search by name
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

            // Filter by category
            const matchesCategory = !selectedCategory || selectedCategory === 'All' || product.category === selectedCategory;

            // Filter by price range
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

            return matchesSearch && matchesCategory && matchesPrice;
        });
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
        </TouchableOpacity>
    );

    const getAllCategories = () => {
        const categoriesData = isUsingDummyData ? dummyCategories : categories;
        // Add "All" category at the beginning
        return [{ id: 'all', name: 'All' }, ...categoriesData];
    };

    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                selectedCategory === item.name && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(
                selectedCategory === item.name ? null : item.name
            )}
        >
            <Text style={[
                styles.categoryText,
                selectedCategory === item.name && styles.selectedCategoryText
            ]}>{item.name}</Text>
        </TouchableOpacity>
    );

    if (loading && !isUsingDummyData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2d8a8a" />
            </View>
        );
    }

    if (error && !isUsingDummyData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={toggleDataSource}
                >
                    <Text style={styles.toggleButtonText}>Use Dummy Data</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header with search and filter */}
                <View style={styles.header}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search products..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => setShowFilters(true)}
                    >
                        <Icon name="filter" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={toggleDataSource}
                    >
                        <Text style={styles.toggleButtonText}>
                            {isUsingDummyData ? 'Use API' : 'Use Dummy'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Categories horizontal list */}
                <View style={styles.categoriesContainer}>
                    <FlatList
                        horizontal
                        data={getAllCategories()}
                        renderItem={renderCategory}
                        keyExtractor={item => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesList}
                    />
                </View>

                {/* Products grid */}
                <FlatList
                    data={filteredProducts()}
                    renderItem={renderProduct}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.productsList}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No products found</Text>
                        </View>
                    }
                />

                {/* Filter Modal */}
                <Modal
                    visible={showFilters}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Filters</Text>

                            <Text style={styles.filterLabel}>Price Range: ${priceRange[0]} - ${priceRange[1]}</Text>
                            <View style={styles.sliderContainer}>
                                <Text style={styles.sliderText}>${priceRange[0]}</Text>
                                <View style={styles.slider}>
                                    {/* Slider Placeholder */}
                                    <Text style={styles.sliderText}>Slider Placeholder</Text>
                                </View>
                                <Text style={styles.sliderText}>${priceRange[1]}</Text>
                            </View>

                            <Pressable
                                style={styles.applyButton}
                                onPress={() => setShowFilters(false)}
                            >
                                <Text style={styles.applyButtonText}>Apply Filters</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        borderColor: '#ddd',  // Light border
        borderWidth: 1,
        fontSize: 14,
        color: '#333',
    },
    filterButton: {
        backgroundColor: '#2d8a8a',
        padding: 10,
        borderRadius: 8,
    },
    toggleButton: {
        backgroundColor: '#2d8a8a',
        padding: 10,
        borderRadius: 8,
        marginLeft: 10,
    },
    toggleButtonText: {
        color: 'white',
        fontSize: 12,
    },
    categoriesContainer: {
        height: 25,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesList: {
        paddingRight: 10,
    },
    categoryItem: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
    },
    selectedCategory: {
        backgroundColor: '#2d8a8a',
    },
    categoryText: {
        color: '#333',
    },
    selectedCategoryText: {
        color: 'white'
    },
    productsList: {
        paddingBottom: 20,
    },
    productCard: {
        flex: 1,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',  // Add shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    productName: {
        marginTop: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    productPrice: {
        color: '#2d8a8a',
        fontWeight: 'bold',
        marginTop: 3,
    },
    productCategory: {
        color: '#666',
        fontSize: 12,
        marginTop: 3,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        color: '#666',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    filterLabel: {
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    slider: {
        flex: 1,
        marginHorizontal: 10,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    sliderText: {
        textAlign: 'center',
        color: '#333',
    },
    applyButton: {
        backgroundColor: '#2d8a8a',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    applyButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
