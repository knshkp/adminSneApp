import React, { useState,useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Text, Button, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ghuman from '../public/ghuman.png';
const Profile = ({ navigation }) => {
  const [profileDetail,setProfileDetail]=useState("");
  useEffect(()=>{
    const fetchProfile=async ()=>{
      const employeeDetails = await AsyncStorage.getItem('userDetails');
      const finalEmployee = JSON.parse(employeeDetails);
      setProfileDetail(finalEmployee);
    }
    fetchProfile()
  })
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userDetails'); // Clear stored user details
      navigation.reset({ index: 0, routes: [{ name: 'MainLog' }] }); // Reset navigation stack
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image source={ghuman} size={100} style={styles.avatar} />
        <Title style={styles.name}>{profileDetail.vendor_name}</Title>
        <Caption style={styles.bio}>{profileDetail.role}</Caption>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <IconButton icon="email" />
          <Text style={styles.infoText}>{profileDetail.upi}</Text>
        </View>
        <View style={styles.infoRow}>
          <IconButton icon="phone" />
          <Text style={styles.infoText}>{profileDetail.phone_number}</Text>
        </View>
        <View style={styles.infoRow}>
          <IconButton icon="map-marker" />
          <Text style={styles.infoText}>{profileDetail.address}</Text>
        </View>
      </View>

      <View style={styles.buttonSection}>
        {/* <Button mode="contained" color="#192841" style={styles.button} onPress={() => {}}>
          Edit Profile
        </Button> */}
        <Button mode="contained" color="#00072D" style={styles.button} onPress={handleLogout}>
          Log Out
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#192841',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
  infoSection: {
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  infoText: {
    fontSize: 18,
    marginLeft: 10,
  },
  buttonSection: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
  },
});

export default Profile;
