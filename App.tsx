// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import MainLogin from './screens/MainLogin';
import Login from './screens/Login';
import OTPScreen from './screens/OTP';
import AdminLogin from './screens/AdminLogin';
import GetEmployee from './screens/GetEmployee';
import EmployeeHome from './screens/EmployeeHome';
import BottomNavigate from './screens/BottomNavigation';
import ComplaintBox from './screens/ComplaintBox';
import Expenses from './screens/Expenses';
import Profile from './screens/Profile';
import AdminBottomNavigate from './screens/AdminBottomNavigation';
import DetailScreen from './screens/DetailEmployeeScreen';
import EmployeeServicesAll from './screens/AllServiceScreen';
import AdminProductScreen from './screens/GetProduct';
import EmployeeTable from './screens/EmployeeReport';
import GetEmployeeBusiness from './screens/GetEmployeeBusiness';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={SplashScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="MainLog"
          component={MainLogin}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigate}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="ComplaintBox"
          component={ComplaintBox}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="AdminLogin"
          component={AdminLogin}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="AllService"
          component={EmployeeServicesAll}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="GetEmployee"
          component={GetEmployee}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="EmployeeHome"
          component={EmployeeHome}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Expenses"
          component={Expenses}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="AdminBottomNavigate"
          component={AdminBottomNavigate}
          options={{ headerShown: false }} 
        />
          <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="AdminProduct"
          component={AdminProductScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="GetEmployeeBusiness"
          component={GetEmployeeBusiness}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="EmployeeServicesTable"
          component={EmployeeTable} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
