import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import Swiper from 'react-native-swiper';

const OnBoard = ({ navigation }) => {
    // Create animated values for opacity and scale
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.8)).current;

    // Function to animate both opacity and scale
    const animateElements = () => {
        opacity.setValue(0);
        scale.setValue(0.8);
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // Use effect to animate on mount
    useEffect(() => {
        animateElements();
    }, []);

    // Animate on index change
    const onIndexChanged = (index) => {
        animateElements();
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.logoText, { opacity, transform: [{ scale }] }]}>
                        Freak
            </Animated.Text>
            <Swiper
                style={styles.wrapper}
                loop={false}
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
                onIndexChanged={onIndexChanged}
                autoplay={true}
                autoplayTimeout={1.5}
                paginationStyle={{ bottom: 70 }}
            >
                {/* Slide 1 */} 
                <View style={styles.slide}>
                
                    <Animated.Image
                        source={require('./../public/newOnboard1.png')}
                        style={[styles.logo, { opacity, transform: [{ scale }] }]}
                    />
                    <Animated.Text style={[styles.title, { opacity, transform: [{ scale }] }]}>
                        Welcome
                    </Animated.Text>
                    <Animated.Text style={[styles.description, { opacity, transform: [{ scale }] }]}>
                        Make Training Better & Get Fit.
                    </Animated.Text>
                </View>
                {/* Slide 2 */}
                <View style={styles.slide}>
                    <Animated.Image
                        source={require('./../public/newOnboardd2.png')}
                        style={[styles.logos, { opacity, transform: [{ scale }] }]}
                    />
                    <Animated.Text style={[styles.title, { opacity, transform: [{ scale }] }]}>
                        Browse
                    </Animated.Text>
                    <Animated.Text style={[styles.description, { opacity, transform: [{ scale }] }]}>
                        Track Your Diet Better & Stay Lean.
                    </Animated.Text>
                </View>
                {/* Slide 3 */}
                <View style={styles.slide}>
                    <Animated.Image
                        source={require('./../public/newOnboarding3.png')}
                        style={[styles.logo, { opacity, transform: [{ scale }] }]}
                    />
                    <Animated.Text style={[styles.title, { opacity, transform: [{ scale }] }]}>
                        Ready, Set..
                    </Animated.Text>
                    <Animated.Text style={[styles.description, { opacity, transform: [{ scale }] }]}>
                        Gain access to our research exesise for specific Body Parts.
                    </Animated.Text>

                </View>
            </Swiper>
            <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('MainLog');
                        }}
                    >
                        <Text style={styles.buttonText}>{'Start Training'}</Text>
                    </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    dotStyle: {
        backgroundColor: '#DFD1C2', // Inactive dot color
        width: 0,
        height: 0,
        borderRadius: 12,
    },
    activeDotStyle: {
        backgroundColor: '#c8aaa3', // Active dot color
        width: 0,
        height: 0,
        borderRadius: 12,
    },
    wrapper: {},
    slide: {
        flex: 1,
    },
    logo: {
        width: 350,
        height: 400,
        marginTop: 20,
    },
    logos: {
        width: 380,
        height: 400,
        marginTop: 20,
        paddingRight:400
    },
    logoText: {
        fontSize: 20,
        fontWeight:'bold',
        marginBottom:40,
        marginTop:15,
        
        color: '#c8a883',
        marginHorizontal: 20,
    },
    title: {
        fontFamily:'Briem Hand',
        fontSize: 35,
        fontWeight:'bold',
        marginTop: 40,
        color: '#000',
        marginHorizontal: 20,
        textAlign: 'center',
    },
    description: {
        marginVertical: 20,
        marginHorizontal: 90,
        textAlign: 'center',
        color: '#000',
    },
    button: {
        position: 'absolute',
        bottom: 20, // Adjust this value to be above the dots
        alignSelf: 'center',
        backgroundColor: '#c8a883',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
        width: 300,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OnBoard;
