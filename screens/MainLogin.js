import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Animated,
} from 'react-native';
import tw from 'twrnc';

const MainLog = ({ navigation }) => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white px-6`}>
      <Image
        source={require('./../public/logos.png')}
        style={tw`w-72 h-72 mb-6`}
        resizeMode="contain"
      />

      <Text style={tw`text-4xl text-[#00072D] font-extrabold`}>Sangram Industry</Text>
      <Text style={tw`text-black text-center mt-2 text-base opacity-80`}>
        App for Employees & Admin
      </Text>

      {/* Admin Button */}
      <TouchableOpacity
        style={tw`w-full py-4 rounded-full bg-[#00072D] mt-20 shadow-lg`}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AdminLogin')}
      >
        <Text style={tw`text-white text-center text-lg font-semibold`}>
          Admin Login
        </Text>
      </TouchableOpacity>

      {/* Employee Button */}
      <TouchableOpacity
        style={tw`w-full py-4 rounded-full bg-white border-2 border-[#00072D] mt-4 shadow-sm`}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={tw`text-[#00072D] text-center text-lg font-semibold`}>
          Employee Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainLog;

