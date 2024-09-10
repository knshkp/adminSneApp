import React from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployeeHome from './EmployeeHome';// Ensure this import exists if SettingsScreen is defined elsewhere
import ComplaintBox from './ComplaintBox';
import Expenses from './Expenses';
import Profile from './Profile';
import GetEmployee from './GetEmployee';
import EmployeeServicesAll from './AllServiceScreen';
import AdminProductScreen from './GetProduct';
const Tab = createBottomTabNavigator();

function AdminBottomNavigate() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All Employees" component={GetEmployee}         
      options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              top:  0,
              width:  25,
              height:  25,
              padding: focused ? 8 : 0,
              borderRadius: 5,
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
      <Tab.Screen name="All Services" component={EmployeeServicesAll} options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              top:  0,
              width:  25,
              height:  25,
              padding: focused ? 8 : 0,
              borderRadius: 5,
              backgroundColor: focused ? '#001B48' : '#FFFFFF', // Change background color based on focus
            }}>
              <Image
                source={require('../public/chat.png')}
                style={{ width: size, height: size, tintColor: focused ? '#FFFFFF' : '#001B48' }} // Change icon tint color based on focus
              />
            </View>
          ),
          headerShown: false
        }}  />
      <Tab.Screen name="All Products" component={AdminProductScreen} options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              top:  0,
              width:  25,
              height:  25,
              padding: focused ? 8 : 0,
              borderRadius: 5,
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
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              top:  0,
              width:  30,
              height:  30,
              padding: focused ? 8 : 0,
              borderRadius: 5,
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
  );
}

export default AdminBottomNavigate;
