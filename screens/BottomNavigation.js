import React,{ useRef, useEffect } from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployeeHome from './EmployeeHome';// Ensure this import exists if SettingsScreen is defined elsewhere
import ComplaintBox from './ComplaintBox';
import Expenses from './Expenses';
import { Animated } from 'react-native';
import EnquiryManagement from './EnquiryBox';
import { Text } from 'react-native-paper';
import Profile from './Profile';
import EmployeeTable from './EmployeeReport';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { KeyboardAvoidingView } from 'react-native';
import EmployeeExpenseReport from './EmployeeExpenseProfile';
const Tab = createBottomTabNavigator()
function BottomNavigate() {
  return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
    <Tab.Navigator    tabBarOptions={{
      keyboardHidesTabBar: true
   }}    screenOptions={{
    tabBarShowLabel: false,
    tabBarStyle: {
      position: 'absolute',
      bottom: 30,
      left: 10,
      right: 10,
      elevation: 5,
      backgroundColor: '#fff',
      borderRadius: 45,
      height: 85,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 10,
    },
    headerShown: false,
  }}>
      <Tab.Screen name="Home" component={EmployeeHome}         
      options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              top:  12,
              padding: focused ? 20 : 0,
              borderRadius: 35,
              backgroundColor: focused ? '#001B48' : '#FFFFFF', // Change background color based on focus
            }}>
              <Image
                source={require('../public/homenew.png')}
                style={{ width: size, height: size, tintColor: focused ? '#FFFFFF' : '#001B48' }} // Change icon tint color based on focus
              />
            </View>
          ),
          headerShown: false
        }} />
            <Tab.Screen name="Expenses" component={EmployeeExpenseReport} options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              top:  12,
              padding: focused ? 20 : 0,
              borderRadius: 35,
              backgroundColor: focused ? '#001B48' : '#FFFFFF', // Change background color based on focus
            }}>
              <Image
                source={require('../public/expenses.png')}
                style={{ width: size, height: size, tintColor: focused ? '#FFFFFF' : '#001B48' }} // Change icon tint color based on focus
              />
            </View>
          ),
          headerShown: false
        }} />
      
      <Tab.Screen name="Complain Box" component={ComplaintBox} options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              top:  12,
              padding: focused ? 20 : 0,
              borderRadius: 35,
              backgroundColor: focused ? '#001B48' : '#FFFFFF', // Change background color based on focus
            }}>
              <Image
                source={require('../public/complain.png')}
                style={{ width: size, height: size, tintColor: focused ? '#FFFFFF' : '#001B48' }} // Change icon tint color based on focus
              />
            </View>
          ),
          headerShown: false
        }}  />

        
        <Tab.Screen name="Enquiry" component={EnquiryManagement} options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              top:  12,  
              padding: focused ? 20 : 0,
              borderRadius: 35,
              backgroundColor: focused ? '#001B48' : '#FFFFFF', // Change background color based on focus
            }}>
              <Image
                source={require('../public/conversation.png')}
                style={{ width: size, height: size, tintColor: focused ? '#FFFFFF' : '#001B48' }} // Change icon tint color based on focus
              />
            </View>
          ),
          headerShown: false
        }}  />
<Tab.Screen 
  name="Reports" 
  component={EmployeeTable} 
  options={({ navigation }) => ({
    tabBarIcon: ({ focused, size }) => (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        top:12,
        padding: focused ? 20 : 0,
        borderRadius: 35,
        backgroundColor: focused ? '#001B48' : '#FFFFFF',
      }}>
        <Text>📊</Text>
      </View>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 15 }}>
        <Image
          source={require('../public/profile.png')}
          style={{ width: 35, height: 35, borderRadius: 50 }} 
        />
      </TouchableOpacity>
    ),
  })}
/>

      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              top:  12,
              width:  30,
              height:  30,
              padding: focused ? 20 : 0,
              borderRadius: 35,
              backgroundColor: focused ? '#001B48' : '#FFFFFF', // Change background color based on focus
            }}>
              <Image
                source={require('../public/profile.png')}
                style={{ width: size, height: size, tintColor: focused ? '#FFFFFF' : '#001B48' }} // Change icon tint color based on focus
              />
            </View>
          ),
          headerShown: false
        }} />

    </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  }
})
export default BottomNavigate;
