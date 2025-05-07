import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';

const AccountScreen = () => {
    const [accountData, setAccountData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');

    // Dummy account data
    const dummyAccountData = {
        name: 'Demo User',
        email: 'demo@example.com',
    };

    // Function to fetch account data from the API
    const fetchAccountData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // fetch from your API:
            const response = await fetch('http://localhost:5000/account');
            if (!response.ok) {
                throw new Error(`Failed to fetch account data: ${response.status}`);
            }
            const data = await response.json();
            setAccountData(data);

        } catch (err) {
            setError(err.message || 'An error occurred while fetching account data.');
            // If fetch fails, use dummy data:
           
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccountData();
    }, []);

     useEffect(() => {
        if (error && !accountData) {
            setAccountData(dummyAccountData);
        }
    }, [error, accountData]);

    const handleResetPassword = () => {
        // Implement password reset functionality (e.g., send a reset email)
        Alert.alert('Password Reset', 'Password reset functionality not implemented yet.');
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditedName(accountData.name);
        setEditedEmail(accountData.email);
    };

    const handleSave = () => {
        // In a real application, you would send the updated data to your API
        // and handle the response.  For this example, we'll just update the
        // local state.
        setAccountData({
            ...accountData,
            name: editedName,
            email: editedEmail,
        });
        setIsEditing(false);
        Alert.alert('Success', 'Account information updated successfully.');
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    // Show dummy data if accountData is null and there is no error
    if (!accountData && !error && !loading) {
        setAccountData(dummyAccountData);
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading Account...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Button onPress={fetchAccountData}>Retry</Button>
            </View>
        );
    }



    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.headerTitle}>Account Information</Text>

                {isEditing ? (
                    <View style={styles.editForm}>
                        <Text style={styles.label}>Name:</Text>
                        <TextInput
                            style={styles.input}
                            value={editedName}
                            onChangeText={setEditedName}
                        />
                        <Text style={styles.label}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            value={editedEmail}
                            onChangeText={setEditedEmail}
                            keyboardType="email-address"
                        />
                        <View style={styles.buttonContainer}>
                            <Button mode="contained" style={styles.saveButton} onPress={handleSave}>
                                Save
                            </Button>
                            <Button mode="outlined" style={styles.cancelButton} onPress={handleCancel}>
                                Cancel
                            </Button>
                        </View>
                    </View>
                ) : (
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Name:</Text>
                        <Text style={styles.infoText}>{accountData?.name}</Text>
                        <Text style={styles.infoLabel}>Email:</Text>
                        <Text style={styles.infoText}>{accountData?.email}</Text>
                        <Button mode="outlined" style={styles.editButton} onPress={handleEdit}>
                            Edit
                        </Button>
                    </View>
                )}

                <Button
                    mode="contained"
                    style={styles.resetPasswordButton}
                    onPress={handleResetPassword}
                >
                    Reset Password
                </Button>
            </ScrollView>
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
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
    },
    editButton: {
        marginTop: 10,
        backgroundColor: '#2d8a8a',
        color: 'white'
    },
    resetPasswordButton: {
        marginTop: 20,
        backgroundColor: '#2d8a8a',
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
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
    },
    editForm: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#333'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    saveButton: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#2d8a8a',
    },
    cancelButton: {
        flex: 1,
        marginLeft: 10,
        borderColor: '#2d8a8a',
    },
});

export default AccountScreen;
