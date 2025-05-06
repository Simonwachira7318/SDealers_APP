import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: user?.profileImage || 'https://via.placeholder.com/100' }} 
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
          onPress={() => setActiveTab('profile')}
        >
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'orders' && styles.activeTab]}
          onPress={() => setActiveTab('orders')}
        >
          <Text>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Text>Settings</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'profile' && (
          <View>
            <View style={styles.infoItem}>
              <Icon name="user" size={20} color="#888" style={styles.infoIcon} />
              <Text style={styles.infoText}>{user?.firstName} {user?.lastName}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="envelope" size={20} color="#888" style={styles.infoIcon} />
              <Text style={styles.infoText}>{user?.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="phone" size={20} color="#888" style={styles.infoIcon} />
              <Text style={styles.infoText}>{user?.phone}</Text>
            </View>
          </View>
        )}

        {activeTab === 'orders' && (
          <View style={styles.ordersContainer}>
            <Text style={styles.sectionTitle}>Order History</Text>
            {/* Here you would map through orders */}
            <View style={styles.emptyOrders}>
              <Icon name="shopping-bag" size={40} color="#ccc" />
              <Text style={styles.emptyText}>No orders yet</Text>
              <TouchableOpacity 
                style={styles.shopButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.shopButtonText}>Start Shopping</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'settings' && (
          <View>
            <TouchableOpacity style={styles.settingsItem}>
              <Text>Edit Profile</Text>
              <Icon name="angle-right" size={20} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Text>Change Password</Text>
              <Icon name="angle-right" size={20} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Text>Payment Methods</Text>
              <Icon name="angle-right" size={20} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsItem}>
              <Text>Notifications</Text>
              <Icon name="angle-right" size={20} color="#888" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.settingsItem, { borderBottomWidth: 0 }]}
              onPress={handleLogout}
            >
              <Text style={{ color: 'red' }}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: { 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  userName: { fontSize: 18, fontWeight: 'bold' },
  userEmail: { color: '#888' },
  tabs: { 
    flexDirection: 'row', 
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomColor: '#4CAF50' },
  content: { flex: 1, padding: 15 },
  infoItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  infoIcon: { marginRight: 15 },
  infoText: { flex: 1 },
  ordersContainer: { flex: 1 },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 15,
    color: '#555',
  },
  emptyOrders: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 30,
  },
  emptyText: { fontSize: 16, color: '#888', marginVertical: 15 },
  shopButton: { 
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  shopButtonText: { color: 'white' },
  settingsItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default ProfileScreen;