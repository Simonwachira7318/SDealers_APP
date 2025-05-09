import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Smartphone X',
            price: 599,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhvbmV8ZW58MHx8MHx8fDA%3D',
            selected: true,
        },
        {
            id: 2,
            name: 'Laptop Pro',
            price: 999,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wfGVufDB8fDB8fHww',
            selected: true,
        },
    ]);

    const toggleItemSelection = (itemId) => {
        setCartItems(cartItems.map(item => 
            item.id === itemId ? { ...item, selected: !item.selected } : item
        ));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (itemId) => {
        Animated.timing(new Animated.Value(1), {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            setCartItems(cartItems.filter(item => item.id !== itemId));
        });
    };

    const selectedItems = cartItems.filter(item => item.selected);
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const renderCartItem = ({ item }) => (
        <Animated.View style={styles.cartItem}>
            <TouchableOpacity 
                onPress={() => toggleItemSelection(item.id)}
                style={[styles.checkbox, item.selected && styles.checkboxSelected]}
            >
                {item.selected && <Icon name="check" size={14} color="#fff" />}
            </TouchableOpacity>
            
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            </View>
            
            <View style={styles.cartItemInfo}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
                
                <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                        <Icon name="minus" size={12} color="#fff" />
                    </TouchableOpacity>
                    
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    
                    <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                        <Icon name="plus" size={12} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            
            <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeItem(item.id)}
            >
                <Icon name="trash" size={16} color="#ff6b6b" />
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                
                <Text style={styles.headerTitle}>Your Cart</Text>
                
                <View style={styles.headerRight}>
                    <Text style={styles.itemCount}>{cartItems.length} items</Text>
                </View>
            </View>

            {cartItems.length > 0 ? (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.cartList}
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryHeader}>
                            <Text style={styles.summaryHeaderText}>Order Summary</Text>
                            <View style={styles.summaryDivider} />
                        </View>
                        
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal ({selectedItems.length} items)</Text>
                            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                        </View>
                        
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping</Text>
                            <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
                        </View>
                        
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tax</Text>
                            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
                        </View>
                        
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.checkoutButton, 
                                selectedItems.length === 0 && styles.checkoutButtonDisabled
                            ]}
                            onPress={() => selectedItems.length > 0 && navigation.navigate('Checkout')}
                            disabled={selectedItems.length === 0}
                        >
                            <Text style={styles.checkoutButtonText}>
                                {selectedItems.length > 0 ? 'Proceed to Checkout' : 'Select items to checkout'}
                            </Text>
                            <Icon name="arrow-right" size={16} color="#fff" style={styles.checkoutIcon} />
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View style={styles.emptyCart}>
                    <View style={styles.emptyCartIcon}>
                        <Icon name="shopping-cart" size={60} color="#e0e0e0" />
                    </View>
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    <Text style={styles.emptyCartSubtext}>Looks like you haven't added anything to your cart yet</Text>
                    <TouchableOpacity
                        style={styles.continueShoppingButton}
                        onPress={() => navigation.navigate('Main')}
                    >
                        <Text style={styles.continueShoppingText}>Continue Shopping</Text>
                        <Icon name="long-arrow-alt-right" size={16} color="#fff" style={styles.shoppingIcon} />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'teal',
        paddingTop: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
        zIndex: 10,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 0.5,
    },
    headerRight: {
        width: 60,
        alignItems: 'flex-end',
    },
    itemCount: {
        color: '#fff',
        fontSize: 12,
        opacity: 0.8,
    },
    cartList: {
        padding: 15,
        paddingBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 15,
        marginBottom: 15,
        shadowColor: 'teal',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: 'teal',
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    checkboxSelected: {
        backgroundColor: 'teal',
        borderColor: 'white',
    },
    imageContainer: {
        backgroundColor: '#f0f4f8',
        borderRadius: 12,
        padding: 5,
    },
    cartItemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        resizeMode: 'contain',
    },
    cartItemInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    cartItemName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#2d3748',
    },
    cartItemPrice: {
        fontSize: 16,
        color: 'teal',
        fontWeight: 'bold',
        marginBottom: 12,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: 'teal',
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#2d3748',
    },
    removeButton: {
        justifyContent: 'center',
        paddingLeft: 10,
    },
    summaryContainer: {
        backgroundColor: '#fff',
        padding: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    summaryHeader: {
        marginBottom: 15,
    },
    summaryHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: 10,
    },
    summaryDivider: {
        height: 3,
        backgroundColor: 'teal',
        width: 50,
        borderRadius: 3,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryLabel: {
        color: 'teal',
        fontSize: 14,
    },
    summaryValue: {
        fontWeight: '600',
        fontSize: 14,
        color: '#2d3748',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3748',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'teal',
    },
    checkoutButton: {
        backgroundColor: 'teal',
        padding: 18,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: 'teal',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    checkoutButtonDisabled: {
        backgroundColor: 'teal',
        shadowOpacity: 0,
    },
    checkoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10,
    },
    checkoutIcon: {
        marginLeft: 5,
    },
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    emptyCartIcon: {
        backgroundColor: '#f0f4f8',
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    emptyCartText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4a6fa5',
        marginBottom: 10,
        textAlign: 'center',
    },
    emptyCartSubtext: {
        fontSize: 16,
        color: '#718096',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
    },
    continueShoppingButton: {
        backgroundColor: 'teal',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'teal',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    continueShoppingText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10,
    },
    shoppingIcon: {
        marginLeft: 5,
    },
});

export default CartScreen;