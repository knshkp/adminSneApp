import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
const MainLog = ({ navigation }) => {
    return (
        <View style={tw`flex justify-center items-center bg-[#fff]`}>
            <Image
                source={require('./../public/logos.png')}
                style={tw`w-80 h-80 drop-shadow-lg`}
            />
            <Text style={tw`text-3xl text-[#00072D] font-bold`}>Sangram Industry</Text>
            <Text style={tw`text-black mx-20 text-center mt-2`}>
                App for Employees & Admin</Text>
            {/* <TouchableOpacity
                style={tw`bg-[#00072D] w-65 py-4 rounded-full drop-shadow-lg mt-18`}
                onPress={() => {
                    navigation.navigate('AdminLogin');
                }}
            >
                <Text style={tw`font-bold text-white text-center text-lg `}>Admin Login</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                style={tw`w-76 py-3 rounded-xl drop-shadow-lg bg-white border-2  mt-42`}
                onPress={() => {
                    navigation.navigate('AdminLogin');
                }}
            >
                <Text style={tw`text-[#00072D] text-lg text-center font-bold`}>Admin Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`w-76 py-3 rounded-xl drop-shadow-lg border-2 mt-6 mb-20 bg-[#00072D]` }
                onPress={() => {
                    navigation.navigate('Login');
                }}
            >
                <Text style={tw`text-center text-white text-lg`}>Employee Login</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MainLog;
