// DetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DetailScreen = ({ route }) => {
    const employee = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Vendor Name:</Text>
            <Text style={styles.value}>{employee.vendor_name}</Text>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>{employee.phone_number}</Text>
            <Text style={styles.label}>Vendor Type:</Text>
            <Text style={styles.value}>{employee.vendor_type}</Text>
            <Text style={styles.label}>Father Name:</Text>
            <Text style={styles.value}>{employee.father_name}</Text>
            <Text style={styles.label}>Seller Phone:</Text>
            <Text style={styles.value}>{employee.seller_phone}</Text>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{employee.address}</Text>
            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>{employee.city}</Text>
            <Text style={styles.label}>Pincode:</Text>
            <Text style={styles.value}>{employee.pincode}</Text>
            <Text style={styles.label}>State:</Text>
            <Text style={styles.value}>{employee.state}</Text>
            <Text style={styles.label}>UPI:</Text>
            <Text style={styles.value}>{employee.upi}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default DetailScreen;
