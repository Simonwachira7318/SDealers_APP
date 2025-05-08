import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomerCareScreen = () => {
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([
        { id: '1', sender: 'Customer Care', text: 'Welcome to our support! How can we assist you today?', timestamp: Date.now() - 60000 },
    ]);
    const [newMessageText, setNewMessageText] = useState('');
    const [isOnline, setIsOnline] = useState(true);
    const [typingIndicator, setTypingIndicator] = useState(false);
    const scrollViewRef = useRef();

    useEffect(() => {
        if (scrollViewRef.current && showChat) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages, showChat]);

    const sendMessage = () => {
        if (!newMessageText.trim()) return;

        const newMessage = {
            id: Date.now().toString(),
            sender: 'You',
            text: newMessageText,
            timestamp: Date.now(),
        };

        setMessages(prevMessages => [...prevMessages, newMessage]);
        setNewMessageText('');

        if (isOnline) {
            setTypingIndicator(true);
            setTimeout(() => {
                const response = {
                    id: (Date.now() + 1).toString(),
                    sender: 'Customer Care',
                    text: "Thank you for your message. We'll get back to you shortly.",
                    timestamp: Date.now(),
                };
                setMessages(prevMessages => [...prevMessages, response]);
                setTypingIndicator(false);
            }, 2000);
        }
    };

    const handleStartChat = () => {
        setShowChat(true);
        setIsOnline(true);
    };

    const handleEndChat = () => {
        setShowChat(false);
        setIsOnline(false);
    };

    const renderMessage = ({ item }) => {
        const isUserMessage = item.sender === 'You';
        return (
            <View key={item.id} style={[
                styles.messageContainer,
                isUserMessage ? styles.userMessage : styles.customerCareMessage,
            ]}>
                <Text style={[
                    styles.messageText,
                    isUserMessage ? styles.userMessageText : styles.customerCareMessageText
                ]}>
                    {item.text}
                </Text>
                <Text style={styles.timestamp}>
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                </Text>
            </View>
        );
    };

    const openPrivacyPolicy = () => {
        // Replace with your actual privacy policy URL
        Linking.openURL('https://itswachira.netlify.app');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {!showChat ? (
                <ScrollView style={styles.container}>
                    <Text style={styles.headerTitle}>Customer Support</Text>
                    
                    {/* Contact Information Card */}
                    <View style={styles.card}>
                        <View style={styles.sectionHeader}>
                            <Icon name="headset" size={18} color="#008080" />
                            <Text style={styles.sectionHeaderText}>Contact Details</Text>
                        </View>
                        
                        <View style={styles.contactItem}>
                            <Icon name="phone" size={16} color="#008080" style={styles.contactIcon} />
                            <Text style={styles.contactText}>+ (254) 123-45678</Text>
                        </View>
                        
                        <View style={styles.contactItem}>
                            <Icon name="envelope" size={16} color="#008080" style={styles.contactIcon} />
                            <Text style={styles.contactText}>support@sdealers.com</Text>
                        </View>
                        
                        <View style={styles.contactItem}>
                            <Icon name="clock" size={16} color="#008080" style={styles.contactIcon} />
                            <Text style={styles.contactText}>Mon-Fri: 9AM - 6PM</Text>
                        </View>
                        
                        <View style={styles.contactItem}>
                            <Icon name="map-marker-alt" size={16} color="#008080" style={styles.contactIcon} />
                            <Text style={styles.contactText}>123 Support St, Kutus KE</Text>
                        </View>
                    </View>

                    {/* Live Chat Button */}
                    <TouchableOpacity style={styles.chatButton} onPress={handleStartChat}>
                        <Icon name="comments" size={20} color="#fff" />
                        <Text style={styles.chatButtonText}>Live Chat with Support</Text>
                    </TouchableOpacity>

                    {/* Privacy Policy Section */}
                    <View style={styles.card}>
                        <View style={styles.sectionHeader}>
                            <Icon name="shield-alt" size={18} color="#008080" />
                            <Text style={styles.sectionHeaderText}>Privacy & Security</Text>
                        </View>
                        <Text style={styles.privacyText}>
                            We value your privacy and security. Read our policy to understand how we protect your information.
                        </Text>
                        <TouchableOpacity style={styles.privacyButton} onPress={openPrivacyPolicy}>
                            <Text style={styles.privacyButtonText}>Read Privacy Policy</Text>
                            <Icon name="chevron-right" size={16} color="#008080" />
                        </TouchableOpacity>
                    </View>

                    {/* FAQ Section */}
                    <View style={styles.card}>
                        <View style={styles.sectionHeader}>
                            <Icon name="question-circle" size={18} color="#008080" />
                            <Text style={styles.sectionHeaderText}>Frequently Asked Questions</Text>
                        </View>
                        <TouchableOpacity style={styles.faqItem}>
                            <Text style={styles.faqText}>How do I track my order?</Text>
                            <Icon name="chevron-right" size={16} color="#666" />
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.faqItem}>
                            <Text style={styles.faqText}>What is your return policy?</Text>
                            <Icon name="chevron-right" size={16} color="#666" />
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.faqItem}>
                            <Text style={styles.faqText}>How can I change my account details?</Text>
                            <Icon name="chevron-right" size={16} color="#666" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            ) : (
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                >
                    <View style={styles.chatView}>
                        <View style={styles.chatHeader}>
                            <TouchableOpacity onPress={handleEndChat}>
                                <Icon name="arrow-left" size={20} color="#008080" />
                            </TouchableOpacity>
                            <Text style={styles.chatHeaderTitle}>Live Support Chat</Text>
                            <View style={styles.statusIndicator}>
                                <Icon name="circle" size={12} color={isOnline ? "#4CAF50" : "#F44336"} />
                                <Text style={styles.statusText}>
                                    {isOnline ? "Online" : "Offline"}
                                </Text>
                            </View>
                        </View>

                        <ScrollView
                            ref={scrollViewRef}
                            style={styles.chatContainer}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        >
                            {messages.map(message => renderMessage({ item: message }))}
                            {typingIndicator && (
                                <View style={styles.customerCareMessage}>
                                    <Text style={styles.customerCareMessageText}>Customer Care is typing...</Text>
                                </View>
                            )}
                        </ScrollView>

                        {isOnline ? (
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Type your message..."
                                    value={newMessageText}
                                    onChangeText={setNewMessageText}
                                    onSubmitEditing={sendMessage}
                                    returnKeyType="send"
                                />
                                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                                    <Icon name="paper-plane" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.offlineContainer}>
                                <Text style={styles.offlineText}>
                                    Our agents are currently offline. Please try again later or use our contact form.
                                </Text>
                            </View>
                        )}
                    </View>
                </KeyboardAvoidingView>
            )}
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
        padding: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#008080',
        marginBottom: 24,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#008080',
        marginLeft: 8,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    contactIcon: {
        marginRight: 12,
        width: 20,
        textAlign: 'center',
    },
    contactText: {
        fontSize: 14,
        color: '#333',
    },
    chatButton: {
        backgroundColor: '#008080',
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    chatButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    privacyText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
    },
    privacyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    privacyButtonText: {
        color: '#008080',
        fontSize: 14,
        fontWeight: '600',
    },
    faqItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    faqText: {
        fontSize: 14,
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
    },
    chatView: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    chatHeaderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#008080',
    },
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 6,
    },
    chatContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    messageContainer: {
        borderRadius: 10,
        padding: 12,
        marginVertical: 5,
        maxWidth: '80%',
    },
    userMessage: {
        backgroundColor: '#e0f7fa',
        alignSelf: 'flex-end',
    },
    customerCareMessage: {
        backgroundColor: '#dcedc8',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    userMessageText: {
        color: '#006644'
    },
    customerCareMessageText: {
        color: '#003300'
    },
    timestamp: {
        fontSize: 12,
        color: 'gray',
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        fontSize: 16,
        color: '#333'
    },
    sendButton: {
        backgroundColor: '#008080',
        padding: 10,
        borderRadius: 8,
    },
    offlineContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    offlineText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});

export default CustomerCareScreen;