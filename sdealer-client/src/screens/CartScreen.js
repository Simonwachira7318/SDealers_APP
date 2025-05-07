import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Dummy data for the cart
const dummyCartItems = [
    { id: '1', name: 'Smartphone', price: 599, quantity: 2, image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhvbmV8ZW58MHx8MHx8fDA%3D' },
    { id: '2', name: 'Laptop', price: 999, quantity: 1, image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wfGVufDB8fDB8fHww' },
    { id: '3', name: 'T-Shirt', price: 19, quantity: 5, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VCUyMFNoaXJ0fGVufDB8fDB8fHww' },
];

const CartScreen = () => {
    const [cartItems, setCartItems] = useState(dummyCartItems);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);  

    // Calculate total price whenever cartItems changes
      useEffect(() => {
        const newTotalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(newTotalPrice);
    }, [cartItems]);

    // Function to fetch cart data from the API
    const fetchCartData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Simulate an API call with a delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            // In a real app, you would fetch data from your API here
            // const response = await fetch('http://localhost:5000/cart');
            // if (!response.ok) {
            //   throw new Error(`Failed to fetch cart data: ${response.status}`);
            // }
            // const data = await response.json();
            // setCartItems(data); // Update state with fetched data

            // For now, keep using dummy data
            setCartItems(dummyCartItems);

        } catch (err) {
            setError(err.message || 'An error occurred while fetching cart data.');
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchCartData(); // Fetch cart data when the component mounts
    }, []);

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(itemId);
            return;
        }
        setCartItems(cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item.id)}
            >
                <Icon name="trash-alt" size={20} color="#888" />
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading Cart...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Button onPress={fetchCartData}>Retry</Button>
            </View>
        );
    }

    if (cartItems.length === 0) {
        return (
            <View style={styles.emptyCartContainer}>
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Your Cart</Text>
                <FlatList
                    data={cartItems}
                    renderItem={renderCartItem}
                    keyExtractor={item => item.id}
                    style={styles.cartList}
                />
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
                </View>
                <Button
                    mode="contained"
                    style={styles.checkoutButton}
                    onPress={() => {
                      // In a real application, you would navigate to the checkout process
                      alert(`Proceeding to checkout with $${totalPrice.toFixed(2)}`);
                    }}
                >
                    Checkout
                </Button>
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
        backgroundColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    cartList: {
        flex: 1,
    },
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemPrice: {
        fontSize: 16,
        color: '#2d8a8a',
        fontWeight: 'bold',
        marginTop: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityButton: {
        backgroundColor: '#2d8a8a',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    quantityButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemQuantity: {
        fontSize: 18,
        marginHorizontal: 10,
        color: '#333',
    },
    removeButton: {
        padding: 5,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    totalPrice: {
        fontSize: 20,
        color: '#2d8a8a',
        fontWeight: 'bold',
    },
    checkoutButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#2d8a8a',
        borderRadius: 8,
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
        backgroundColor: '#f0f0f0'
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    },
    emptyCartText: {
        fontSize: 18,
        color: '#666',
    }
});

export default CartScreen;
