import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import MarketNews from './News';
import TableFour from './Dashboard';
import MarketTrend from "./MarketTrend";
import OpenInterest from './OpenInterest/OpenInterest';
import Profile from './Profile';
import Stock from './Stock';


const Tab = createBottomTabNavigator();

// Custom header component
const CustomHeader = ({ navigation }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
        <Image
          source={require('../public/subsIcon.png')} // Replace with your subscription image path
          style={{ width: 24, height: 24 }} // Adjust width and height as needed
        />
      </TouchableOpacity>
    </View>
  );
};


function NavBar({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={Stock}
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
        }}
      />


      <Tab.Screen
        name="Open Interest"
        component={OpenInterest}
        options={{
          tabBarLabel: 'Open Interest',
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
                source={require('../public/oiNew.png')}
                style={{ width: size, height: size, tintColor: focused ? '#FFFFFF' : '#001B48' }}
              />
            </View>
          ),
          headerTitleAlign: 'center', // Disable header for the Dashboard screen
          headerRight: () => <CustomHeader navigation={navigation} />, // Add custom header
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}

        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top:  0,
                  width:  25,
                  height:  25,
                  padding: focused ? 8 : 0,
                  borderRadius: 5,
                  backgroundColor: focused ? '#001B48' : '#FFFFFF',
                }}>
                <Image
                  source={require('../public/userIcon1.png')}
                  style={{ width: size, height: size, tintColor: focused ? '#fff' : color }}
                />
              </View>
            )
          },
          headerShown: false
        }}



      />
      <Tab.Screen
        name="Today's News"
        component={MarketNews}
        options={{
          tabBarLabel: 'News',
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
                source={require('../public/newsIconNew.png')}
                style={{ width: size, height: size, tintColor: focused ? '#FFFFFF' : '#001B48' }}
              />
            </View>
          ),
          headerTitleAlign: 'center', // Align header title to center
          headerRight: () => <CustomHeader navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name="Market Trend"
        component={MarketTrend}
        options={{
          tabBarLabel: 'Market Trend',
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
                source={require('../public/marketTrendIconNew.png')}
                style={{ width: size, height: size, tintColor: focused ? '#FFFFFF' : '#001B48' }}
              />
            </View>
          ),
          headerTitleAlign: 'center',
          headerRight: () => <CustomHeader navigation={navigation} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default NavBar;
