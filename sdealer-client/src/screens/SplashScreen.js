import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated,
    Easing,
    Dimensions,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
    // Animation states
    const [logoScale] = useState(new Animated.Value(0.5));
    const [logoPosition] = useState(new Animated.ValueXY({ x: 0, y: -100 }));
    const [opacity] = useState(new Animated.Value(0));
    const [textSlide] = useState(new Animated.Value(50));
    const [progress] = useState(new Animated.Value(0));
    const [showButton, setShowButton] = useState(false);
    const [cartAnimation] = useState(new Animated.Value(0));
    const timeoutRef = useRef(null);
    const hasNavigated = useRef(false);

    // Particle effects
    const particleCount = 15;
    const particles = Array.from({ length: particleCount });

    // Shopping cart animation
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(cartAnimation, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                    delay: 500
                }),
                Animated.timing(cartAnimation, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, [cartAnimation]);

    const cartBounce = cartAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20]
    });

    useEffect(() => {
        // Sequence of animations for progress
        const progressAnimation = Animated.timing(progress, {
            toValue: 100,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,
        });

        // Sequence of main animations
        Animated.sequence([
            // Logo bounce in
            Animated.parallel([
                Animated.spring(logoScale, {
                    toValue: 1.1,
                    friction: 5,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.spring(logoPosition.y, {
                    toValue: 0,
                    friction: 5,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]),

            // Logo settle
            Animated.spring(logoScale, {
                toValue: 1,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),

            // Text and elements fade in
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(textSlide, {
                    toValue: 0,
                    duration: 800,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),

            // Run the progress animation
            progressAnimation,

        ]).start(() => {
            // Show button after animations complete
            setShowButton(true);
            // Auto navigation
            timeoutRef.current = setTimeout(() => {
                if (!hasNavigated.current) {
                    navigation.replace('Login');
                }
            }, 9000);
        });

        return () => {
            // Clear the timeout when component unmounts
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [navigation, logoScale, opacity, textSlide, logoPosition, progress]);

    const logoAnimationStyle = {
        transform: [
            { scale: logoScale },
            { translateY: logoPosition.y }
        ],
    };

    const textAnimationStyle = {
        opacity,
        transform: [{ translateY: textSlide }],
    };

    const progressWidth = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    const handleGetStarted = () => {
        hasNavigated.current = true;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        navigation.replace('Login');
    };

    return (
        <View style={[styles.container, styles.background]}>
            <SafeAreaView style={styles.safeArea}>
                {/* Floating particles */}
                {particles.map((_, index) => {
                    const size = Math.random() * 10 + 5;
                    const left = Math.random() * width;
                    const top = Math.random() * height * 0.6;
                    const opacity = Math.random() * 0.6 + 0.2;
                    const animationDelay = Math.random() * 2000;

                    const animValue = useRef(new Animated.Value(0)).current;
                    useEffect(() => {
                        Animated.loop(
                            Animated.sequence([
                                Animated.delay(animationDelay),
                                Animated.timing(animValue, {
                                    toValue: 1,
                                    duration: 3000 + Math.random() * 3000,
                                    easing: Easing.linear,
                                    useNativeDriver: true,
                                })
                            ])
                        ).start();
                    }, [animationDelay, animValue]);

                    const translateY = animValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, Math.random() > 0.5 ? 50 : -50],
                    });

                    const translateX = animValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, Math.random() > 0.5 ? 30 : -30],
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.particle,
                                {
                                    width: size,
                                    height: size,
                                    left,
                                    top,
                                    opacity,
                                    transform: [{ translateY }, { translateX }],
                                    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                                    borderRadius: size / 2,
                                }
                            ]}
                        />
                    );
                })}

                <View style={styles.content}>
                    {/* Animated shopping cart icon */}
                    <View style={styles.logoContainer}>
                        <Animated.View style={[styles.logoShadow, logoAnimationStyle]} />

                        <Animated.View style={[styles.cartContainer, { transform: [{ translateY: cartBounce }] }]}>
                            <Icon name="shopping-cart" size={80} color="white" />
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>3</Text>
                            </View>
                        </Animated.View>

                        <Animated.Image
                            source={{ uri: 'https://simonimageurl.netlify.app/images/rider.png' }}
                            style={[styles.logo, logoAnimationStyle]}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Main title */}
                    <Animated.Text style={[styles.title, textAnimationStyle]}>
                        Welcome to <Text style={styles.brand}>S!Dealers</Text>
                    </Animated.Text>

                    {/* Subtitle with animated typing effect */}
                    <View style={styles.subtitleContainer}>
                        <Animated.Text style={[styles.subtitle, textAnimationStyle]}>
                            Empowering Local Commerce
                        </Animated.Text>
                        <Animated.Text style={[styles.subtitle, textAnimationStyle, { marginTop: 5 }]}>
                            Connecting Communities
                        </Animated.Text>
                    </View>

                    {/* Progress bar */}
                    <View style={styles.progressWrapper}>
                        <View style={styles.progressContainer}>
                            <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
                        </View>
                    </View>

                    {/* Loading dots animation */}
                    <View style={styles.dotsContainer}>
                        {[0, 1, 2].map((i) => (
                            <Animated.View
                                key={i}
                                style={[
                                    styles.dot,
                                    {
                                        opacity: progress.interpolate({
                                            inputRange: [0 + (i * (3000 / 3)), (3000 / 3) + (i * (3000 / 3))],
                                            outputRange: [0.3, 1],
                                            extrapolate: 'clamp'
                                        }),
                                        transform: [{
                                            scale: progress.interpolate({
                                                inputRange: [0 + (i * (3000 / 3)), (3000 / 3) + (i * (3000 / 3))],
                                                outputRange: [0.7, 1.2],
                                                extrapolate: 'clamp'
                                            })
                                        }]
                                    }
                                ]}
                            />
                        ))}
                    </View>

                    {/* Optional Get Started button */}
                    {showButton && (
                        <Animated.View style={[styles.buttonContainer, { opacity }]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleGetStarted}
                            >
                                <Text style={styles.buttonText}>Get Started</Text>
                                <Icon name="arrow-right" size={16} color="white" style={styles.buttonIcon} />
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                </View>

                {/* Footer with security badge */}
                <Animated.View style={[styles.footer, { opacity }]}>
                    <Text style={styles.footerText}>The Future of E-Commerce</Text>
                    <View style={styles.secureBadge}>
                        <Icon name="lock" size={12} color="white" />
                        <Text style={styles.secureText}>100% Secure</Text>
                    </View>
                </Animated.View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        backgroundColor: 'teal',
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    cartContainer: {
        position: 'relative',
        zIndex: 3,
        marginBottom: 20,
    },
    cartBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'green',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white'
    },
    cartBadgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    logo: {
        width: 180,
        height: 180,
        zIndex: 2,
    },
    logoShadow: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255,255,255,0.1)',
        zIndex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    brand: {
        color: 'black',
    },
    subtitleContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    progressWrapper: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    progressContainer: {
        flex: 1,
        height: 7,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 3,
        overflow: 'hidden',
        marginRight: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: 'black',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)'
    },
    dotsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'white',
        marginHorizontal: 4,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 12,
        height: 50,
        width: '80%',
        paddingHorizontal: 30,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 10,
    },
    buttonIcon: {
        marginLeft: 5,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        marginBottom: 10,
    },
    secureBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    secureText: {
        color: 'white',
        fontSize: 12,
        marginLeft: 5,
    },
    particle: {
        position: 'absolute',
    },
});

export default SplashScreen;