import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList, ActivityIndicator, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useRef } from 'react';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
const FloatingLabelInput = ({ label, value, onChangeText, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.inputContainer}>
            {(isFocused || value) && <Text style={styles.floatingLabel}>{label}</Text>}
            <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                placeholder={!isFocused ? label : ''}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
        </View>
    );
};

const GetEmployee = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [submitAmountModal,setSubmitAmountModal]=useState(false);
    const [amount,setAmount]=useState(0)
    const [pin,setPin]=useState(0);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [newEmployee, setNewEmployee] = useState({
        vendor_name: '',
        phone_number: '',
        vendor_type: '',
        father_name: '',
        seller_phone: '8104450592',
        address: '',
        city: '',
        pincode: '',
        state: '',
        upi: ''
    });
    const fetchState = async (pinCode) => {
        if (!pinCode) return; // Prevent unnecessary API calls
        try {
            const api = `https://api.postalpincode.in/pincode/${pinCode}`;
            const response = await axios.get(api);
            const data = response.data;
            if (data[0]?.PostOffice?.length > 0) {
                const state = data[0].PostOffice[0].State;
                const city=data[0].PostOffice[0].Block;
                setNewEmployee((prev) => ({...prev, city}));
                setNewEmployee((prev) => ({ ...prev, state }));
            } else {
                alert('Invalid Pincode');
            }
        } catch (error) {
            console.error('Error fetching state:', error);
        }
    };
    
    
    
    const exportToExcel = () => {
        const data = vendors.map((vendor, index) => ({
            id: index + 1,
            vendor_name: vendor.vendor_name,
            phone_number: vendor.phone_number,
            city: vendor.city,
            state: vendor.state,
        }));
    
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    
        const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

        RNFS.writeFile(`${RNFS.DownloadDirectoryPath}/EmployeeData.xlsx`, wbout, 'base64')
          .then(() => console.log(`${RNFS.DownloadDirectoryPath}/EmployeeData.xlsx`))
          .catch(error => console.log('Error saving file:', error));
        
    };
    
    const navigation = useNavigation();

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await fetch('https://sangramindustry-i5ws.onrender.com/employee/getEmployee?phone=8104450592');
            
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
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
    const handleEditEmployee = async () => {
        try {
            console.log(`>>>>>>>${JSON.stringify(selectedEmployee)}`)
            const response = await fetch(`https://sangramindustry-i5ws.onrender.com/employee/editEmployee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedEmployee),
            });
    
            if (response.ok) {
                const data = await response.json();
                const updatedVendors = vendors.map(vendor =>
                    vendor._id === selectedEmployee._id ? data.result : vendor
                );
                setVendors(updatedVendors);
                setFilteredVendors(updatedVendors);
                setEditModalVisible(false);
            } else {
                console.error('Error editing employee:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const openEditModal = (employee) => {
        console.log(selectedEmployee)
        setSelectedEmployee(employee);
        setEditModalVisible(true);
    };
    

    const handleAddEmployee = async () => {
        try {
            console.log(newEmployee)
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
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.vendor_name}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.phone_number}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.vendor_type}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.father_name}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.address}</Text>
            </View>
            
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.city}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.state}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.pincode}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.cellText}>{item.upi}</Text>
            </View>
            <View style={[styles.cell, { width: 120 }]}>
                <Button
                    title="Submit Amount"
                    onPress={() => setSubmitAmountModal(true)}
                    color="#092147"
                />
            </View>
            <View style={[styles.cell,tw`rounded-full`, { width: 100 }]}>
                <Button
                    title="Details"
                    onPress={() => navigation.navigate('DetailScreen', item)}
                    color="#092147"
                    style={tw`rounded-full`}
                />
            </View>
        <View style={[styles.cell, { width: 120 }]}>
            <Button
                title="Edit"
                onPress={() => openEditModal(item)}
                color="#092147"
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
        
        <View style={tw`flex mt-5 `}>
            <View style={tw`p-2.5 m-2 bg-white rounded-xl shadow-md flex flex-row items-center`}>
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
                <Button title="🔍" onPress={handleSearch} color="#f0f0f0" />
            </View>
            <View style={tw`p-2.5  bg-white rounded-xl shadow-md flex flex-row `}>
            <TouchableOpacity title="Add Employee" onPress={() => setModalVisible(true)} style={tw`bg-[#092147] h-10 rounded-full mr-5`} ><Text style={tw`text-white font-bold m-2`}>Add Employee</Text></TouchableOpacity>
            <TouchableOpacity onPress={exportToExcel} style={tw`bg-[#092147] h-10 ml-25 rounded-full`}>
                <Text style={tw`text-white font-bold mt-2 mx-2`}>Export to Excel</Text>
            </TouchableOpacity>
            </View>


            <ScrollView horizontal={true} style={styles.scrollContainer}>
            <View>

                    <View style={styles.header}>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Name</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Phone Number</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Vendor Type</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Father Name</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>Address</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>City</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>PinCode</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>State</Text>
                        <Text style={[styles.cell, styles.headerCell, { width: 120 }]}>UPI</Text>
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
                            placeholder="Customer Name"
                            value={newEmployee.vendor_name}
                            onChangeText={text => setNewEmployee({ ...newEmployee, vendor_name: text })}
                        />
                        <FloatingLabelInput
                            style={styles.modalInput}
                            placeholder="Phone Number"
                            keyboardType='phone-pad'
                            maxLength={10}
                            value={newEmployee.phone_number}
                            onChangeText={text => setNewEmployee({ ...newEmployee, phone_number: text })}
                        />
                        <Picker
                                selectedValue={newEmployee.vendor_type}
                                onValueChange={(itemValue) => setNewEmployee({ ...newEmployee, vendor_type: itemValue })}
                            >
                                <Picker.Item label="Select Entry Type" value="" />
                                <Picker.Item label="Sales" value="Sales" />
                                <Picker.Item label="Service" value="Service" />
                                <Picker.Item label="Marketing" value="Marketing" />
                       </Picker>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Father Name"
                            value={newEmployee.father_name}
                            onChangeText={text => setNewEmployee({ ...newEmployee, father_name: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Employee Phone"
                            value={newEmployee.seller_phone}
                            keyboardType='phone-pad'
                            maxLength={10}
                            onChangeText={text => setNewEmployee({ ...newEmployee, seller_phone: text })}
                            editable={false}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Address"
                            value={newEmployee.address}
                            onChangeText={text => setNewEmployee({ ...newEmployee, address: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Customer Pincode"
                            value={newEmployee.pincode}
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                                setNewEmployee((prev) => ({ ...prev, pincode: text }));
                                if (text.length === 6) {
                                    fetchState(text); // Trigger fetch when the pincode is valid length
                                }
                            }}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Customer City"
                            value={newEmployee.city}
                            onChangeText={text => setNewEmployee({ ...newEmployee, city: text })}
                            editable={false}
                        />


                        <TextInput
                            style={styles.modalInput}
                            placeholder="Customer State"
                            value={newEmployee.state}
                            onChangeText={text => setNewEmployee({ ...newEmployee, state: text })}
                            editable={false}
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
    visible={isEditModalVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setEditModalVisible(false)}
>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Employee</Text>
            <TextInput
                style={styles.modalInput}
                placeholder="Employee Name"
                value={selectedEmployee?.vendor_name || ''}
                onChangeText={text => setSelectedEmployee({ ...selectedEmployee, vendor_name: text })}
            />
            <TextInput
                style={styles.modalInput}
                placeholder="Phone Number"
                value={selectedEmployee?.phone_number||''}
                keyboardType="phone-pad"
                onChangeText={text => setSelectedEmployee({ ...selectedEmployee, phone_number: text })}
            />
            <TextInput
                style={styles.modalInput}
                placeholder="Address"
                value={selectedEmployee?.address || ''}
                onChangeText={text => setSelectedEmployee({ ...selectedEmployee, address: text })}
            />
            <TextInput
                style={styles.modalInput}
                placeholder="Pincode"
                value={selectedEmployee?.pincode || ''}
                keyboardType="number-pad"
                onChangeText={text => setSelectedEmployee({ ...selectedEmployee, pincode: text })}
            />
            <TextInput
                style={styles.modalInput}
                placeholder="UPI"
                value={selectedEmployee?.upi || ''}
                onChangeText={text => setSelectedEmployee({ ...selectedEmployee, upi: text })}
            />
            <View style={styles.modalButtonContainer}>
                <Button title="Save" onPress={handleEditEmployee} color="#001b78" />
                <Button title="Cancel" onPress={() => setEditModalVisible(false)} color="#001b78" />
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
        backgroundColor: '#092147',
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
    floatingLabel: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontSize: 12,
        color: '#666',
        backgroundColor: '#fff',
        paddingHorizontal: 4,
        zIndex: 1,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
    },
    inputFocused: {
        borderColor: '#092147',
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
