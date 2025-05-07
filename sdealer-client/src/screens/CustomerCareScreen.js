import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Alert } from 'react-native';

const CustomerCareScreen = () => {
    const [messages, setMessages] = useState([
        { id: '1', sender: 'Customer Care', text: 'Welcome to our support! How can we assist you today?', timestamp: Date.now() - 60000 },
    ]);
    const [newMessageText, setNewMessageText] = useState('');
    const [isOnline, setIsOnline] = useState(true); // Simulate agent online status
    const [typingIndicator, setTypingIndicator] = useState(false); // Simulate typing
    const scrollViewRef = useRef();

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

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

        // Simulate a response from customer care (replace with actual logic)
        if (isOnline) {
            setTypingIndicator(true);
            setTimeout(() => {
                const response = {
                    id: (Date.now() + 1).toString(),
                    sender: 'Customer Care',
                    text: "Thank you for your message.  We are processing your request.",
                    timestamp: Date.now(),
                };
                setMessages(prevMessages => [...prevMessages, response]);
                setTypingIndicator(false);
            }, 2000);
        } else {
            setTimeout(() => {
                const offlineResponse = {
                    id: (Date.now() + 1).toString(),
                    sender: 'Customer Care',
                    text: "Our agents are currently offline. Please leave a message and we'll get back to you.",
                    timestamp: Date.now(),
                };
                setMessages(prevMessages => [...prevMessages, offlineResponse]);
            }, 1000);
        }
    };

    const handleStartChat = () => {
        setIsOnline(true); // Simulate agent coming online
        setMessages([
            {
                id: Date.now().toString(),
                sender: 'Customer Care',
                text: 'Welcome back!  An agent is now available to chat.',
                timestamp: Date.now()
            }
        ]);
    };

    const handleEndChat = () => {
        setIsOnline(false);
        setMessages([
            {
                id: Date.now().toString(),
                sender: 'Customer Care',
                text: 'The chat has ended.  Thank you for contacting us.',
                timestamp: Date.now()
            }
        ]);
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust as needed
            >
                <View style={styles.container}>
                    <Text style={styles.headerTitle}>Customer Support</Text>

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
                                Agents are currently offline.  Please check back later.
                            </Text>
                            <Button
                                mode="contained"
                                style={styles.startChatButton}
                                onPress={handleStartChat}
                            >
                                Start New Chat
                            </Button>
                        </View>
                    )}
                    {isOnline && (
                        <Button
                            mode="outlined"
                            style={styles.endChatButton}
                            onPress={handleEndChat}
                        >
                            End Chat
                        </Button>
                    )}
                </View>
            </KeyboardAvoidingView>
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
    chatContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    messageContainer: {
        borderRadius: 10,
        padding: 10,
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
        color: '#333',
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
        backgroundColor: '#2d8a8a',
        padding: 10,
        borderRadius: 8,
    },
    offlineContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    offlineText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginHorizontal: 20
    },
    startChatButton: {
        marginTop: 10,
        backgroundColor: '#2d8a8a'
    },
    endChatButton: {
        marginTop: 20,
        backgroundColor: '#2d8a8a',
        alignSelf: 'center'
    }
});

export default CustomerCareScreen;
