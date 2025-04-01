import React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployeeHome from './EmployeeHome';// Ensure this import exists if SettingsScreen is defined elsewhere
import ComplaintBox from './ComplaintBox';
import Expenses from './Expenses';
import EnquiryManagement from './EnquiryBox';
import { Text } from 'react-native-paper';
import Profile from './Profile';
import EmployeeTable from './EmployeeReport';
import { KeyboardAvoidingView } from 'react-native';
const Tab = createBottomTabNavigator();

function BottomNavigate() {
  return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
    <Tab.Navigator screenOptions={{ swipeEnabled: false }}>
      <Tab.Screen name="Home" component={EmployeeHome}         
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
            <Tab.Screen name="Expenses" component={Expenses} options={{
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
      
      <Tab.Screen name="Complain Box" component={ComplaintBox} options={{
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
              top:  0,
              width:  25,
              height:  25,  
              padding: focused ? 8 : 0,
              borderRadius: 5,
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
        width: 25,
        height: 25,
        padding: focused ? 1 : 0,
        borderRadius: 5,
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

      {/* <Tab.Screen name="Profile" component={Profile} options={{
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
        }} /> */}

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
