import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const OrderConfirmationScreen = ({ route, navigation }) => {
    const { orderId } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    <View style={styles.successIcon}>
                        <Icon name="check-circle" size={80} color="#4CAF50" />
                    </View>
                    <Text style={styles.title}>Order Confirmed!</Text>
                    <Text style={styles.subtitle}>Thank you for your purchase</Text>
                    
                    <View style={styles.orderInfo}>
                        <Text style={styles.orderText}>Order Number: <Text style={styles.orderId}>{orderId}</Text></Text>
                        <Text style={styles.orderText}>Estimated Delivery: <Text style={styles.orderDate}>June 15, 2023</Text></Text>
                    </View>
                    
                    <Image 
                        source={{ uri: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFja2FnZXxlbnwwfHwwfHx8MA%3D%3D' }} 
                        style={styles.deliveryImage}
                    />
                    
                    <Text style={styles.message}>
                        Your order has been received and is being processed. You'll receive a confirmation email shortly with all the details.
                    </Text>
                </View>
            </ScrollView>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: '#2d8a8a' }]}
                    onPress={() => navigation.navigate('Main')}
                >
                    <Text style={styles.buttonText}>Continue Shopping</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: '#333', marginTop: 10 }]}
                    onPress={() => navigation.navigate('OrderTracking', { orderId })}
                >
                    <Text style={styles.buttonText}>Track Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    successIcon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    orderInfo: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    orderText: {
        fontSize: 16,
        marginBottom: 10,
    },
    orderId: {
        fontWeight: 'bold',
        color: '#2d8a8a',
    },
    orderDate: {
        fontWeight: 'bold',
    },
    deliveryImage: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        padding: 20,
    },
    button: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default OrderConfirmationScreen;