import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
const MainLog = ({ navigation }) => {
    return (
        <View style={tw`flex justify-center items-center bg-white`}>
            <Image
                source={require('./../public/logo.jpeg')}
                style={tw`w-80 h-80 drop-shadow-lg`}
            />
            <Text style={tw`text-xl text-[#00072D] drop-shadow-2xl antialised font-bold`}>SNE COMPANY APP</Text>
            <Text style={tw`text-black mx-20 text-center mt-5`}>
                With this app, you can start to track your employees.</Text>
            <TouchableOpacity
                style={tw`bg-[#00072D] w-65 py-4 item-center rounded-full drop-shadow-lg mt-18`}
                onPress={() => {
                    navigation.navigate('AdminLogin');
                }}
            >
                <Text style={tw`fw-bold text-white text-center text-lg `}>Admin Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`w-65 py-4 item-center rounded-full drop-shadow-lg border-2 mt-6`}
                onPress={() => {
                    navigation.navigate('AdminLogin');
                }}
            >
                <Text style={tw`text-[#00072D] text-lg text-center font-bold`}>Office Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`w-65 py-4 item-center rounded-full drop-shadow-lg border-2 mt-6 bg-[#00072D]` }
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
