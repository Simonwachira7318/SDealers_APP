import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

const OrderTrackingScreen = () => {
  // Mock order data
  const order = {
    id: 'ORD-81423406',
    type: 'Standard Delivery',
    shippingDetails: {
      address: '123 Kutus St, Apt 4B, Kutus,Kirinyaga, Kenya',
      recipient: 'Simon Wachira',
      phone: '+(254)12345678'
    },
    status: 'intransit',
    items: [
      {
        id: '1',
        name: 'Wireless Headphones',
        description: 'Premium JBL noise-cancelling wireless headphones with 30hr battery',
        image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D',
        price: 199.99
      }
    ]
  };

  const statusSteps = [
    { key: 'paid', label: 'Paid', icon: 'money-bill-wave' },
    { key: 'confirmed', label: 'Confirmed', icon: 'check-circle' },
    { key: 'intransit', label: 'In Transit', icon: 'shipping-fast' },
    { key: 'arrived', label: 'At Pickup Station', icon: 'map-marker-alt' },
    { key: 'completed', label: 'Completed', icon: 'box-open' }
  ];

  const getStatusIndex = () => {
    switch (order.status) {
      case 'paid': return 0;
      case 'confirmed': return 1;
      case 'intransit': return 2;
      case 'arrived': return 3;
      case 'completed': return 4;
      default: return 0;
    }
  };

  const currentStatusIndex = getStatusIndex();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Order Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Order Tracking</Text>
        </View>

        {/* Order Info */}
        <View style={styles.card}>
          <Text style={styles.orderType}>{order.type}</Text>
          <Text style={styles.orderId}>Order ID: {order.id}</Text>
        </View>

        {/* Shipping Details */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Icon name="truck" size={18} color="#008080" />
            <Text style={styles.sectionHeaderText}>Shipping Details</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="map-marker-alt" size={16} color="#666" style={styles.detailIcon} />
            <Text style={styles.detailText}>{order.shippingDetails.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="user" size={16} color="#666" style={styles.detailIcon} />
            <Text style={styles.detailText}>{order.shippingDetails.recipient}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="phone" size={16} color="#666" style={styles.detailIcon} />
            <Text style={styles.detailText}>{order.shippingDetails.phone}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Icon name="tasks" size={18} color="#008080" />
            <Text style={styles.sectionHeaderText}>Order Status</Text>
          </View>
          
          <View style={styles.progressContainer}>
            {statusSteps.map((step, index) => (
              <React.Fragment key={step.key}>
                <View style={styles.stepContainer}>
                  <View style={[
                    styles.stepIcon,
                    index <= currentStatusIndex ? styles.activeStep : styles.inactiveStep
                  ]}>
                    <Icon 
                      name={step.icon} 
                      size={14} 
                      color={index <= currentStatusIndex ? '#fff' : '#999'} 
                    />
                  </View>
                  <Text style={[
                    styles.stepLabel,
                    index <= currentStatusIndex ? styles.activeText : styles.inactiveText
                  ]}>
                    {step.label}
                  </Text>
                </View>
                {index < statusSteps.length - 1 && (
                  <View style={[
                    styles.connector,
                    index < currentStatusIndex ? styles.activeConnector : styles.inactiveConnector
                  ]} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Icon name="box-open" size={18} color="#008080" />
            <Text style={styles.sectionHeaderText}>Order Items</Text>
          </View>
          
          {order.items.map(item => (
            <View key={item.id} style={styles.itemContainer}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Review Order Button */}
        <TouchableOpacity style={styles.reviewButton}>
          <Icon name="star" size={18} color="#fff" />
          <Text style={styles.reviewButtonText}>Rate & Review Order</Text>
        </TouchableOpacity>

        {/* After Sales Services */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Icon name="hands-helping" size={18} color="#008080" />
            <Text style={styles.sectionHeaderText}>After Sales Services</Text>
          </View>
          
          <TouchableOpacity style={styles.serviceButton}>
            <Icon name="undo" size={16} color="#008080" style={styles.serviceIcon} />
            <Text style={styles.serviceText}>Return Order</Text>
            <Icon name="chevron-right" size={16} color="#666" style={styles.arrowIcon} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.serviceButton}>
            <Icon name="tools" size={16} color="#008080" style={styles.serviceIcon} />
            <Text style={styles.serviceText}>Repair Request</Text>
            <Icon name="chevron-right" size={16} color="#666" style={styles.arrowIcon} />
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity style={styles.serviceButton}>
            <Icon name="money-bill-wave" size={16} color="#008080" style={styles.serviceIcon} />
            <Text style={styles.serviceText}>Request Refund</Text>
            <Icon name="chevron-right" size={16} color="#666" style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#008080',
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
  orderType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 14,
    color: '#666',
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    marginRight: 8,
    width: 20,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  stepContainer: {
    alignItems: 'center',
    width: 60,
  },
  stepIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeStep: {
    backgroundColor: '#008080',
  },
  inactiveStep: {
    backgroundColor: '#e0e0e0',
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  activeText: {
    color: '#008080',
    fontWeight: '600',
  },
  inactiveText: {
    color: '#999',
  },
  connector: {
    height: 2,
    flex: 1,
    marginTop: 14,
  },
  activeConnector: {
    backgroundColor: '#008080',
  },
  inactiveConnector: {
    backgroundColor: '#e0e0e0',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008080',
  },
  reviewButton: {
    backgroundColor: '#008080',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  serviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  serviceIcon: {
    marginRight: 12,
    width: 20,
    textAlign: 'center',
  },
  serviceText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  arrowIcon: {
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 32,
  },
});

export default OrderTrackingScreen;