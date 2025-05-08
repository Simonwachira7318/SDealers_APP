import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const ProductDetailScreen = ({ route }) => {
    const { product } = route.params;
    const navigation = useNavigation();
    const [quantity, setQuantity] = useState(1);

    // Similar products data
    const similarProducts = [
        {
            id: 101,
            name: 'Smartphone Y',
            price: 549,
            image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBob25lfGVufDB8fDB8fHww',
        },
        {
            id: 102,
            name: 'Smartphone Z',
            price: 699,
            image: 'https://images.unsplash.com/photo-1567578923208-5cc60003892d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBob25lfGVufDB8fDB8fHww',
        },
        {
            id: 103,
            name: 'Tablet Pro',
            price: 399,
            image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFibGV0fGVufDB8fDB8fHww',
        },
    ];

    const renderStarRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<Icon key={i} name="star" solid color="#FFD700" size={16} />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<Icon key={i} name="star-half-alt" solid color="#FFD700" size={16} />);
            } else {
                stars.push(<Icon key={i} name="star" solid color="#DDD" size={16} />);
            }
        }

        return (
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                {stars}
                <Text style={{ marginLeft: 5, color: '#666' }}>{rating.toFixed(1)}</Text>
            </View>
        );
    };

    const renderReviewItem = ({ item }) => (
        <View style={styles.reviewItem}>
            <Text style={styles.reviewUser}>{item.user}</Text>
            <View style={{ flexDirection: 'row' }}>
                {Array(5).fill().map((_, i) => (
                    <Icon
                        key={i}
                        name={i < item.rating ? "star" : "star"}
                        solid={i < item.rating}
                        color={i < item.rating ? "#FFD700" : "#DDD"}
                        size={14}
                    />
                ))}
            </View>
            <Text style={styles.reviewComment}>{item.comment}</Text>
        </View>
    );

    const renderSimilarProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.similarProduct}
            onPress={() => navigation.replace('ProductDetail', { product: item })}
        >
            <Image source={{ uri: item.image }} style={styles.similarProductImage} />
            <Text style={styles.similarProductName}>{item.name}</Text>
            <Text style={styles.similarProductPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Icon name="shopping-cart" size={20} color="#333" />
                    </TouchableOpacity>
                </View>

                <Image source={{ uri: product.image }} style={styles.productImage} />

                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>${product.price}</Text>

                    {renderStarRating(product.rating)}

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.productDescription}>{product.description}</Text>

                    <Text style={styles.sectionTitle}>Reviews ({product.reviews.length})</Text>
                    <FlatList
                        data={product.reviews}
                        renderItem={renderReviewItem}
                        keyExtractor={item => item.id.toString()}
                        scrollEnabled={false}
                    />

                    <Text style={styles.sectionTitle}>You May Also Like</Text>
                    <FlatList
                        horizontal
                        data={similarProducts}
                        renderItem={renderSimilarProduct}
                        keyExtractor={item => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.similarProductsList}
                    />
                </View>
            </ScrollView>

            <View style={styles.actionBar}>
                <View style={styles.quantitySelector}>
                    <TouchableOpacity
                        onPress={() => setQuantity(Math.max(1, quantity - 1))}
                        style={styles.quantityButton}
                    >
                        <Icon name="minus" size={14} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                        onPress={() => setQuantity(quantity + 1)}
                        style={styles.quantityButton}
                    >
                        <Icon name="plus" size={14} color="#333" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buyNowButton}>
                    <Text style={styles.buyNowText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        backgroundColor: '#f5f5f5',
    },
    productInfo: {
        padding: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2d8a8a',
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        lineHeight: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    reviewItem: {
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    reviewUser: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    reviewComment: {
        color: '#666',
        marginTop: 5,
    },
    similarProduct: {
        width: 150,
        marginRight: 15,
    },
    similarProductImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    similarProductName: {
        marginTop: 5,
        fontWeight: '600',
    },
    similarProductPrice: {
        color: '#2d8a8a',
        fontWeight: 'bold',
    },
    similarProductsList: {
        paddingBottom: 20,
    },
    actionBar: {
        flexDirection: 'row',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginRight: 10,
    },
    quantityButton: {
        padding: 10,
    },
    quantityText: {
        paddingHorizontal: 15,
        fontSize: 16,
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: '#2d8a8a',
        padding: 15,
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buyNowButton: {
        flex: 1,
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buyNowText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProductDetailScreen;