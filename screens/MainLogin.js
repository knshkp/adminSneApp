import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const MainLog = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('./../public/logo.jpeg')}
                style={styles.logo}
            />
            <Text style={styles.title}>SNE COMPANY APP</Text>
            <Text style={styles.description}>
                With this app, you can start to track your employees.</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('AdminLogin');
                }}
            >
                <Text style={styles.buttonText}>Admin Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button,styles.loginButton]}
                onPress={() => {
                    navigation.navigate('AdminLogin');
                }}
            >
                <Text style={styles.buttonTexts}>Office Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('Login');
                }}
            >
                <Text style={styles.buttonText}>Employee Login</Text>
            </TouchableOpacity>
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
        width: 300,
        height: 350,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 50,
        color: '#001b48',
        textAlign: 'center',
    },
    description: {
        marginVertical: 20,
        marginHorizontal: 60,
        textAlign: 'center',
        color: '#000',
    },
    button: {
        backgroundColor: '#001b48',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 20,
        width: 250,
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#fff',
        borderColor: '#001b48',
        borderWidth: 2,
        marginTop: 20,
        color:'#c8a883'
    },
    buttonText: {
        color: '#f0f0f0',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonTexts: {
        color: '#001b48',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MainLog;
