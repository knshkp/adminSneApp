import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Animated, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userDetails = await AsyncStorage.getItem('userDetails');
        const user = userDetails ? JSON.parse(userDetails) : null;

        setTimeout(() => {
          if (user) {
            if (user.role === 'admin') {
              console.log('Admin logged in, navigating to AdminScreen');
              navigation.reset({ index: 0, routes: [{ name: 'AdminBottomNavigate' }] });
            } else {
              console.log('Employee logged in, navigating to BottomNavigation');
              navigation.reset({ index: 0, routes: [{ name: 'BottomNavigation' }] });
            }
          } else {
            console.log('User is not logged in, navigating to MainLog');
            navigation.reset({ index: 0, routes: [{ name: 'MainLog' }] });
          }
        }, 2000); // Wait for 2 seconds before navigation
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => checkLoginStatus());

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
