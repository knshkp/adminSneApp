import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Animated, Text } from 'react-native';



function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateAndNavigate = async () => {
      if (navigation) {
        // Fade-in animation for the logo
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000, // 2000 milliseconds = 2 seconds
          useNativeDriver: true,
        }).start(async () => {
          // Animation completed
            console.log(`User is not logged in.`);
            // If not logged in, navigate to the onboarding screen
            navigation.navigate('MainLog');
        });
      }
    };

    animateAndNavigate(); // Call the function to start animation and navigation

    return () => {
      // Clear the animation value on component unmount
      fadeAnim.setValue(0);
    };
  }, [fadeAnim, navigation]); 

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logo, { opacity: fadeAnim }]}>Sne Admin</Animated.Text>
      <Animated.Text style={[styles.head, { opacity: fadeAnim }]}>App for Sne Employees</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 32,
    color: '#001b48',
    fontWeight: 'bold',
  },
  head: {
    fontSize: 14,
    color: '#000',
  },
});

export default SplashScreen;
