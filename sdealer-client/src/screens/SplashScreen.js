import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const SplashScreen = ({ navigation }) => {
  const [logoScale] = useState(new Animated.Value(0.8));
  const [opacity] = useState(new Animated.Value(0));
  const [textSlide] = useState(new Animated.Value(50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1200,
        easing: Easing.easeIn,
        useNativeDriver: true,
      }),
      Animated.timing(textSlide, {
        toValue: 0,
        duration: 1200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation, logoScale, opacity, textSlide]);

  const logoAnimationStyle = {
    transform: [{ scale: logoScale }],
    opacity,
  };

  const textAnimationStyle = {
    opacity,
    transform: [{ translateY: textSlide }],
  };

  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View style={[styles.logoContainer, logoAnimationStyle]}>
          {/* splash screen logo */}
          <Image
            source={{ uri: 'https://simonimageurl.netlify.app/images/rider.png' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Animated.Text style={[styles.title, textAnimationStyle]}>
            Welcome to S!Dealers
          </Animated.Text>
        </Animated.View>
        <Animated.Text style={[styles.auto, textAnimationStyle]}>
          Empowering Local Commerce, Connecting Communities.
        </Animated.Text>
        <Animated.View style={{ transform: [{ rotate: spin }], opacity }}>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 180, 
    height: 180,
    marginBottom: 30,
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  auto: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 40,
    marginBottom: 20,
  },
});

export default SplashScreen;