// src/navigation/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import CustomerCareScreen from '../screens/CustomerCareScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Categories':
              iconName = 'list-ul';
              break;
            case 'Cart':
              iconName = 'shopping-cart';
              break;
            case 'Account':
              iconName = 'user';
              break;
            case 'CustomerCare':
              iconName = 'headset';
              break;
            default:
              iconName = 'question';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.7)',
        tabBarStyle: {
          backgroundColor: 'teal',
          borderTopWidth: 0,
          height: 80,
          paddingTop: 5,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginTop: 0,
          marginBottom: 3,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="CustomerCare" component={CustomerCareScreen} 
        options={{ title: 'Customer Care' }} 
      />
    </Tab.Navigator>
  );
}