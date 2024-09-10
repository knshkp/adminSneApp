import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';

const AdminLogin = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inner}>
            <Text style={styles.normal}>Admin SNE</Text>
            <Text style={{ color: "#001b48", marginLeft: 3,marginTop:70 }}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Phone No."
              placeholderTextColor="#888"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity style={styles.button} onPress={() => {
                  if (phoneNumber==='8104450592') {
                    navigation.navigate("OTP");
                  }
                  else{
                    Alert('Admin No is not matched')
                  } 
                }}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {/* <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.sbutton}>
                <Image source={require('./../public/google.png')} style={styles.buttonImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.sbutton} onPress={() => navigation.navigate("Login")}>
                <Image source={require('./../public/email.png')} style={styles.buttonImage} />
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop:70,
    width:420

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 50,
  },
  container: {
    flex: 1,
    elevation: 5,
    alignItems: 'center',
  },
  inner: {
    backgroundColor: '#f0f0f0',
    opacity: 0.9,
    width: '86%',
    borderRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  heads: {
    fontSize: 28,
    color: '#c8a883',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  normal: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10,
    color: '#001b48',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    color: "#000",
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  button: {
    backgroundColor: '#001b48',
    alignItems: 'center',
    opacity: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    margin: 5,
    marginTop:350
  },
  buttonImage: {
    height: 28,
    width: 28,
  },
  buttonText: {
    color: '#f0f0f0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sbuttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sbutton: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#001B48',
    borderWidth: 1,
    marginVertical: 25,
    width: 50,
    height: 50,
  }
});

export default AdminLogin;
