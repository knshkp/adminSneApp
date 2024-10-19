import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList, ActivityIndicator, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
const GetEmployee = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [submitAmountModal,setSubmitAmountModal]=useState(false);
    const [amount,setAmount]=useState(0)
    const [newEmployee, setNewEmployee] = useState({
        vendor_name: '',
        phone_number: '',
        vendor_type: '',
        father_name: '',
        seller_phone: '',
        address: '',
        city: '',
        pincode: '',
        state: '',
        upi: ''
    });
    const navigation = useNavigation();

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await fetch('https://sangramindustry-i5ws.onrender.com/employee/getEmployee?phone=8104450592');
                if (response.ok) {
                    const data = await response.json();
                    setVendors(data.result);
                    setFilteredVendors(data.result);
                } else {
                    console.error('Error fetching data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        


        fetchVendorData();
    }, []);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filteredData = vendors.filter(vendor => 
            vendor.vendor_name.toLowerCase().includes(query) ||
            vendor.state.toLowerCase().includes(query) ||
            vendor.city.toLowerCase().includes(query) ||
            vendor.pincode.includes(query) ||
            vendor.phone_number.includes(query) ||
            vendor.vendor_type.toLowerCase().includes(query) ||
            vendor.father_name.toLowerCase().includes(query) ||
            vendor.seller_phone.includes(query) ||
            vendor.address.toLowerCase().includes(query) ||
            vendor.upi.toLowerCase().includes(query)
        );
        setFilteredVendors(filteredData);
    };

    const handleAddEmployee = async () => {
        try {
            const response = await fetch('https://sangramindustry-i5ws.onrender.com/employee/addEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmployee),
            });
            if (response.ok) {
                const data = await response.json();
                setVendors([...vendors, data.result]);
                setFilteredVendors([...vendors, data.result]);
                setModalVisible(false);
                setNewEmployee({
                    vendor_name: '',
                    phone_number: '',
                    vendor_type: '',
                    father_name: '',
                    seller_phone: '',
                    address: '',
                    city: '',
                    pincode: '',
                    state: '',
                    upi: ''
                });
            } else {
                console.error('Error adding employee:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <View style={[styles.cell, { width: 150 }]}>
                <Text style={styles.cellText}>{item.vendor_name}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.phone_number}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.phone_number}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.phone_number}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.phone_number}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.phone_number}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.phone_number}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.phone_number}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.phone_number}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Button
                    title="Submit Amount"
                    onPress={() => setSubmitAmountModal(true)}
                    color="#001b78"
                />
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Button
                    title="Details"
                    onPress={() => navigation.navigate('DetailScreen', item)}
                    color="#001b78"
                />
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#001b78" />
            </View>
        );
    }

    return (
        <View style={tw`flex mt-5 bg-[f5f5f5]`}>
            <View style={tw`p-2.5 m-2 bg-white rounded-xl mb-5 shadow-md flex flex-row items-center`}>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
                <Button title="Search" onPress={handleSearch} style={tw`rounded-xl `} />
            </View>
            <Button title="Add Employee" onPress={() => setModalVisible(true)} color="#001b78" />
            <ScrollView horizontal={true} style={styles.scrollContainer}>
                <View>
                    <View style={styles.header}>
                        <Text style={[styles.cell, styles.headerCell, { width: 150 }]}>Vendor Name</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Phone Number</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Total Sales</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Total Service</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Total Enquiry</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Total Complaint</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Total Marketing</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Today Total Amount</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Pending Amount</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Submitted Amount</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Details</Text>

                    </View>
                    <ScrollView>
                        <FlatList
                            data={filteredVendors}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>
                </View>
            </ScrollView>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Employee</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Vendor Name"
                            value={newEmployee.vendor_name}
                            onChangeText={text => setNewEmployee({ ...newEmployee, vendor_name: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Phone Number"
                            value={newEmployee.phone_number}
                            onChangeText={text => setNewEmployee({ ...newEmployee, phone_number: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Vendor Type"
                            value={newEmployee.vendor_type}
                            onChangeText={text => setNewEmployee({ ...newEmployee, vendor_type: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Father Name"
                            value={newEmployee.father_name}
                            onChangeText={text => setNewEmployee({ ...newEmployee, father_name: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Seller Phone"
                            value={newEmployee.seller_phone}
                            onChangeText={text => setNewEmployee({ ...newEmployee, seller_phone: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Address"
                            value={newEmployee.address}
                            onChangeText={text => setNewEmployee({ ...newEmployee, address: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="City"
                            value={newEmployee.city}
                            onChangeText={text => setNewEmployee({ ...newEmployee, city: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Pincode"
                            value={newEmployee.pincode}
                            onChangeText={text => setNewEmployee({ ...newEmployee, pincode: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="State"
                            value={newEmployee.state}
                            onChangeText={text => setNewEmployee({ ...newEmployee, state: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="UPI"
                            value={newEmployee.upi}
                            onChangeText={text => setNewEmployee({ ...newEmployee, upi: text })}
                        />
                        <View style={styles.modalButtonContainer}>
                            <Button title="Add" onPress={handleAddEmployee} color="#001b78" />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} color="#001b78" />
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={submitAmountModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSubmitAmountModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Amount Paid By Employee</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Amount"
                            value={amount}
                            keyboardType='Number'
                            onChangeText={text => setAmount(amount)}
                        />
                        <View style={styles.modalButtonContainer}>
                            <Button title="Add" onPress={handleAddEmployee} color="#001b78" />
                            <Button title="Cancel" onPress={() => setSubmitAmountModal(false)} color="#001b78" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    scrollContainer: {
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#001b78',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 5,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    cell: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        paddingLeft: 12,
    },
    cellText: {
        fontSize: 14,
        color: '#333',
    },
    headerCell: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default GetEmployee;
