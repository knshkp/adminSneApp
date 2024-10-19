import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

const OTPScreen = ({ navigation }) => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const otpTextInputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    if (value === '' && newOTP[index] === '' && index > 0) {
      otpTextInputRefs.current[index - 1].focus();  
    }
    
    newOTP[index] = value;
    setOTP(newOTP);
    if (value && index < otp.length - 1) {
      otpTextInputRefs.current[index + 1].focus();
    }
  };
  

  const handleSubmit = () => {
    const enteredOTP = otp.join('');
    if (enteredOTP === '123456') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AdminBottomNavigate' }], // Navigating to OTP screen
      });
    } else {
      // Handle incorrect OTP scenario
    }
  };

  return (
    
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
            <Text style={styles.timer}>{`00:${timer < 10 ? '0' + timer : timer}`}</Text>
            <Text style={styles.basic}>Type the verification code we've sent you</Text>
            <View style={styles.otpContainer}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={1}
                  placeholder='X'
                  placeholderTextColor='#a9a9a9'
                  onChangeText={(text) => handleOTPChange(index, text)}
                  value={value}
                  ref={(ref) => (otpTextInputRefs.current[index] = ref)}
                  autoFocus={index === 0}
                />
              ))}
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Continue</Text>
            </TouchableOpacity>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop: 380,
    height: 600,
    width: 420,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inner: {
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
    opacity: 0.7,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    height: 45,
    width: 45,
    borderWidth: 1,
    borderRadius: 15,
    textAlign: 'center',
    marginHorizontal: 5,
    fontSize: 20,
    color: '#000',
    borderColor: '#001b48',
  },
  basic: {
    marginTop: 5,
    fontSize: 17,
    color: '#000',
    marginBottom: 5,
    marginTop:100
  },
  timer: {
    marginTop: 1,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#001b48',
    marginTop:100
  },
  submitButton: {
    marginTop: 330,
    marginBottom: 40,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: '#c8a883',
    borderWidth: 1,
    width: 350,
    height: 50,
    textAlign: 'center',
    justifyContent:'center',
    backgroundColor: '#001b48',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OTPScreen;
