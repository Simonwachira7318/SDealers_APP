import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CheckoutScreen = ({ navigation }) => {
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        mpesaPhone: ''
    });

    const handleInputChange = (name, value) => {
        // Special handling for M-Pesa phone number
        if (name === 'mpesaPhone') {
            // Remove any non-digit characters
            const digitsOnly = value.replace(/[^0-9]/g, '');
            // Limit to 10 digits (Kenyan phone numbers)
            const truncated = digitsOnly.slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: truncated }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const validateMpesaPhone = (phone) => {
        // Kenyan phone numbers start with 07 or 01 and have 10 digits total
        const regex = /^(07|01)\d{8}$/;
        return regex.test(phone);
    };

    const handlePlaceOrder = () => {
        // Basic validation
        if (!formData.fullName || !formData.address || !formData.city || !formData.zipCode) {
            Alert.alert('Error', 'Please fill in all required shipping information');
            return;
        }

        // Payment method specific validation
        if (paymentMethod === 'credit' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
            Alert.alert('Error', 'Please fill in all payment details');
            return;
        }

        if (paymentMethod === 'mpesa' && !validateMpesaPhone(formData.mpesaPhone)) {
            Alert.alert('Error', 'Please enter a valid Kenyan phone number starting with 07 or 01 followed by 8 digits');
            return;
        }

        // Process order
        Alert.alert(
            'Order Placed',
            'Your order has been placed successfully!',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('OrderConfirmation', { 
                        orderId: 'ORD-' + Math.floor(Math.random() * 1000000),
                        paymentMethod: paymentMethod === 'mpesa' ? 'M-Pesa' : 
                                      paymentMethod === 'credit' ? 'Credit Card' :
                                      paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'
                    })
                }
            ]
        );
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\/+/g, '').replace(/[^0-9]/gi, '');

        if (v.length >= 3) {
            return `${v.slice(0, 2)}/${v.slice(2)}`;
        }

        return value;
    };

    return (
        <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Checkout</Text>
                    <View style={{ width: 20 }} />
                </View>

                {/* Shipping Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shipping Information</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChangeText={(text) => handleInputChange('fullName', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address *"
                        value={formData.address}
                        onChangeText={(text) => handleInputChange('address', text)}
                    />
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, { flex: 1, marginRight: 10 }]}
                            placeholder="City *"
                            value={formData.city}
                            onChangeText={(text) => handleInputChange('city', text)}
                        />
                        <TextInput
                            style={[styles.input, { width: 80 }]}
                            placeholder="State"
                            value={formData.state}
                            onChangeText={(text) => handleInputChange('state', text)}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="ZIP Code *"
                        keyboardType="numeric"
                        value={formData.zipCode}
                        onChangeText={(text) => handleInputChange('zipCode', text)}
                    />
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>

                    <TouchableOpacity
                        style={[styles.paymentOption, paymentMethod === 'credit' && styles.selectedPayment]}
                        onPress={() => setPaymentMethod('credit')}
                    >
                        <Icon
                            name={paymentMethod === 'credit' ? 'dot-circle' : 'circle'}
                            size={20}
                            color={paymentMethod === 'credit' ? '#2d8a8a' : '#666'}
                        />
                        <Text style={styles.paymentText}>Credit/Debit Card</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.paymentOption, paymentMethod === 'mpesa' && styles.selectedPayment]}
                        onPress={() => setPaymentMethod('mpesa')}
                    >
                        <Icon
                            name={paymentMethod === 'mpesa' ? 'dot-circle' : 'circle'}
                            size={20}
                            color={paymentMethod === 'mpesa' ? '#2d8a8a' : '#666'}
                        />
                        <Text style={styles.paymentText}>M-Pesa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.paymentOption, paymentMethod === 'paypal' && styles.selectedPayment]}
                        onPress={() => setPaymentMethod('paypal')}
                    >
                        <Icon
                            name={paymentMethod === 'paypal' ? 'dot-circle' : 'circle'}
                            size={20}
                            color={paymentMethod === 'paypal' ? '#2d8a8a' : '#666'}
                        />
                        <Text style={styles.paymentText}>PayPal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.paymentOption, paymentMethod === 'cod' && styles.selectedPayment]}
                        onPress={() => setPaymentMethod('cod')}
                    >
                        <Icon
                            name={paymentMethod === 'cod' ? 'dot-circle' : 'circle'}
                            size={20}
                            color={paymentMethod === 'cod' ? '#2d8a8a' : '#666'}
                        />
                        <Text style={styles.paymentText}>Cash on Delivery</Text>
                    </TouchableOpacity>

                    {paymentMethod === 'credit' && (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Card Number *"
                                keyboardType="numeric"
                                value={formData.cardNumber}
                                onChangeText={(text) => handleInputChange('cardNumber', formatCardNumber(text))}
                                maxLength={19}
                            />
                            <View style={styles.row}>
                                <TextInput
                                    style={[styles.input, { flex: 1, marginRight: 10 }]}
                                    placeholder="MM/YY *"
                                    keyboardType="numeric"
                                    value={formData.expiryDate}
                                    onChangeText={(text) => handleInputChange('expiryDate', formatExpiryDate(text))}
                                    maxLength={5}
                                />
                                <TextInput
                                    style={[styles.input, { width: 100 }]}
                                    placeholder="CVV *"
                                    keyboardType="numeric"
                                    value={formData.cvv}
                                    onChangeText={(text) => handleInputChange('cvv', text)}
                                    maxLength={4}
                                    secureTextEntry
                                />
                            </View>
                        </>
                    )}

                    {paymentMethod === 'mpesa' && (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Phone Number (07xxxxxxxx or 01xxxxxxxx) *"
                                keyboardType="phone-pad"
                                value={formData.mpesaPhone}
                                onChangeText={(text) => handleInputChange('mpesaPhone', text)}
                                maxLength={10}
                            />
                            <View style={styles.mpesaNote}>
                                <Text style={styles.mpesaNoteText}>
                                    You will receive an M-Pesa push notification to complete payment
                                </Text>
                                <Text style={[styles.mpesaNoteText, { marginTop: 5 }]}>
                                    Powered by Safaricom Kenya
                                </Text>
                            </View>
                        </>
                    )}
                </View>

                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>$1,598.00</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping</Text>
                        <Text style={styles.summaryValue}>$5.99</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tax</Text>
                        <Text style={styles.summaryValue}>$127.84</Text>
                    </View>
                    <View style={[styles.summaryRow, { marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 }]}>
                        <Text style={[styles.summaryLabel, { fontWeight: 'bold', fontSize: 16 }]}>Total</Text>
                        <Text style={[styles.summaryValue, { fontWeight: 'bold', fontSize: 16 }]}>$1,731.83</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Place Order Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.placeOrderButton}
                    onPress={handlePlaceOrder}
                >
                    <Text style={styles.placeOrderText}>
                        {paymentMethod === 'mpesa' ? 'Pay with M-Pesa' : 'Place Order'}
                    </Text>
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
        paddingBottom: 80, 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingTop: 50,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    section: {
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectedPayment: {
        backgroundColor: '#f9f9f9',
    },
    paymentText: {
        marginLeft: 10,
        fontSize: 16,
    },
    mpesaNote: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    mpesaNoteText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        color: '#666',
    },
    summaryValue: {
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    placeOrderButton: {
        backgroundColor: '#2d8a8a',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    placeOrderText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CheckoutScreen;