import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Pressable, Platform } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AdminLogin = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  const handleLogin = async () => {
    if (phoneNumber === '8104450592' && password === 'Sangram@1234') {
      const adminData = {
        phone: phoneNumber,
        role: "admin", // Assign admin role
      };
      await AsyncStorage.setItem('userDetails', JSON.stringify(adminData));
      navigation.reset({
        index: 0,
        routes: [{ name: 'OTP' }], // Navigating to OTP screen
      });
    } else {
      setErrorMessage('Phone Number or Password is incorrect');
      setModalVisible(true);
    }
  };
  return (
    <View style={tw`flex-1 items-center bg-white`}>
      <Text style={tw`mt-20 font-extrabold text-4xl text-[#00072D]`}>Admin Login</Text>
      <View style={tw`w-80 mt-14 py-10`}>
        <Text style={tw`text-left text-lg font-bold text-[#00072D] ml-2`}>Phone</Text>
        <TextInput
          style={tw`bg-[#f0f0f0] border-2 rounded-2xl border-[#f0f0f0] mt-4 p-3`}
          placeholder="Enter Your Phone No."
          placeholderTextColor="#888"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />
        <Text style={tw`text-left text-lg font-bold text-[#00072D] ml-2 mt-6`}>Password</Text>
        
        <View style={tw`relative`}>
  <TextInput
    style={tw`bg-[#f0f0f0] border-2 rounded-2xl border-[#f0f0f0] mt-4 p-3 pr-12`}
    placeholder="Enter Your Password"
    placeholderTextColor="#888"
    value={password}
    onChangeText={setPassword}
    secureTextEntry={!showPassword} // Toggle password visibility
  />
  <TouchableOpacity
    style={tw`absolute right-4 top-6`}
    onPress={() => setShowPassword(!showPassword)}
  >
    <Text style={tw`text-xl text-[#888]`}>{showPassword ? '🙈' : '👁️'}</Text>
  </TouchableOpacity>
</View>
        <TouchableOpacity
          style={tw`bg-[#00072D] mt-60 items-center py-4 rounded-full`}
          onPress={handleLogin}
        >
          <Text style={tw`text-lg text-white font-bold`}>Login</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex items-center bg-#[f0f0f0]justify-center  mt-60`}>
          <View style={tw`bg-[#fff] shadow-2xl shadow-blue-500/50 rounded-lg p-5 items-center w-10/12`}>
            <Text style={tw`mb-10 text-lg text-[#00072D] font-bold`}>{errorMessage}</Text>
            <Pressable
              style={tw`p-2 bg-[#00072D] rounded-full w-30`}
              onPress={() => setModalVisible(false)}
            >
              <Text style={tw`text-lg font-bold text-white text-center`}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default AdminLogin;
