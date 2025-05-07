import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const SplashScreen = ({ navigation }) => {
  const [rotation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Home'); // Replace splash screen in navigation stack
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigation, rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          {/* splash screen logo */}
          <Image
            source={{ uri: 'https://via.placeholder.com/150/FFFFFF/0000FF?Text=S!Dealers+Logo' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome to S!Dealers</Text>
        </View>
        <Text style={styles.auto}>Empowering Local Commerce, Connecting Communities.</Text>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Icon name="spinner" size={40} color="white" />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'teal',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  auto: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SplashScreen;