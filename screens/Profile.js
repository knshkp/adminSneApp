import React from 'react';
import { ScrollView, View, Image, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Text, Button, IconButton, Colors } from 'react-native-paper';
import ghuman from '../public/ghuman.png'
const Profile = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image 
          source={ghuman} 
          size={100} 
          style={styles.avatar}
        />
        <Title style={styles.name}>Kanishk Pareek</Title>
        <Caption style={styles.bio}>Software Developer</Caption>
      </View>
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <IconButton icon="email"  />
          <Text style={styles.infoText}>knshk@example.com</Text>
        </View>
        <View style={styles.infoRow}>
          <IconButton icon="phone"  />
          <Text style={styles.infoText}>+1 234 567 890</Text>
        </View>
        <View style={styles.infoRow}>
          <IconButton icon="map-marker" />
          <Text style={styles.infoText}>Jaipur,Rajasthan</Text>
        </View>
      </View>
      <View style={styles.buttonSection}>
        <Button 
          mode="contained" 
          onPress={() => {}}
          color="#192841"
          style={styles.button}
        >
          Edit Profile
        </Button>
        <Button 
          mode="contained" 
          onPress={() => {}}
          color="#192841"
          style={styles.button}
        >
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
