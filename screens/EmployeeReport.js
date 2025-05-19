import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import XLSX from 'xlsx';
import tw from 'twrnc';
import { Modal } from 'react-native-paper';
import { Image } from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Linking } from 'react-native';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [serviceType, setServiceType] = useState('All');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchEmployeeData = async () => {
        const employeeDetails = await AsyncStorage.getItem('userDetails');
        const finalEmployee = JSON.parse(employeeDetails);
        console.log(finalEmployee)
        const response = await fetch(`https://sangramindustry-i5ws.onrender.com/employeeServices/getEmployee?phone=${finalEmployee.phone_number}`);
        const data = await response.json();
        setEmployees(data.result);
        setFilteredEmployees(data.result);
        setServiceType('All');   
        setFromDate(null);       
        setToDate(null);
        setIsModalVisible(false);
      };
  
      fetchEmployeeData();
    }, [])
  );
  useEffect(() => {
    applyFilters();
  }, [employees, serviceType, fromDate, toDate]);
  const applyFilters = () => {
    let tempData = [...employees];
    if (serviceType !== 'All') {
      tempData = tempData.filter(employee => employee.service_type?.toLowerCase() === serviceType.toLowerCase());
    }
    if (fromDate && toDate) {
      tempData = tempData.filter(employee => {
        const employeeDate = moment(employee.createdAt);
        return employeeDate.isBetween(moment(fromDate).startOf('day'), moment(toDate).endOf('day'), null, '[]');
      });
    }
    setFilteredEmployees(tempData);
  };

  const exportToExcel = async () => {
    try {
      const data = filteredEmployees.map((vendor, index) => ({
        id: index + 1,
        seller_phone: vendor.seller_phone,
        vendor_name: vendor.customer_name,
        shop_name: vendor.shop_name,
        phone_number: vendor.service_type,
        product: vendor.product_name,
        price: vendor.product_price,
        discount: vendor.discount,
        final_price: vendor.final_price,
        createdAt: vendor.createdAt,
      }));

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Employees');

      const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
      const uniqueFileName = `Services_${moment().format('YYYYMMDD_HHmmss')}.xlsx`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${uniqueFileName}`;

      await RNFS.writeFile(filePath, wbout, 'base64');

      await Share.open({
        url: `file://${filePath}`,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        filename: uniqueFileName,
      });

    } catch (error) {
      console.error('Error exporting or sharing file:', error);
    }
  };

  const renderItem = ({ item }) => {
    const openInGoogleMaps = () => {
      const { customer_latitude, customer_longitude } = item;
      if (customer_latitude && customer_longitude) {
        const googleMapsUrl = `https://www.google.com/maps?q=${customer_latitude},${customer_longitude}`;
        Linking.openURL(googleMapsUrl);
      } else {
        Alert.alert('Error', 'Location data not available');
      }
    };
  
    const handleImagePress = () => {
      var ur=item.shop_photo
      setSelectedImageUri(ur);  
      setIsModalVisible(true);   
    };
    return(
    <View style={styles.row}>
      <Text style={styles.cell}>{item.seller_phone}</Text>
      <Text style={styles.cell}>{item.customer_name}</Text>
      {serviceType === "Marketing" && <Text style={styles.cell}>{item.shop_name}</Text>}
      {serviceType === "All" && <Text style={styles.cell}>{item.service_type}</Text>}
      {serviceType!=="Marketing"&&<Text style={styles.cell}>{item.product_name}</Text>}
      {serviceType!=="Marketing"&&<Text style={styles.cell}>{item.product_price}</Text>}
      {serviceType !== "Marketing" && <Text style={styles.cell}>{item.discount}</Text>}
      {serviceType !== "Marketing" && <Text style={styles.cell}>{item.final_price}</Text>}
      {serviceType!=="Marketing"&&<Text style={styles.cell}>{item.payment_method}</Text>}
      {serviceType === "Marketing" && <Text style={styles.headerText}>{item.customer_address}</Text>}
      {serviceType === "Marketing" && <Text style={styles.headerText}>{item.customer_city}</Text>}
      {serviceType === "Marketing" && <Text style={styles.headerText}>{item.customer_state}</Text>}
      {serviceType === "Marketing" && <Text style={styles.headerText}>{item.customer_address}</Text>}
      {serviceType === "Marketing" &&item.shop_photo? (
        <TouchableOpacity onPress={handleImagePress}>
          <Text style={[styles.cell, { color: '#4287f5', textDecorationLine: 'underline' }]}>View</Text>
        </TouchableOpacity>
      ):serviceType === "Marketing"&&<TouchableOpacity onPress={() => handleImagePress(item.shop_photo)}>
      <Text style={[styles.cell, { color: '#4287f5', textDecorationLine: 'underline' }]}>Not Attached</Text>
    </TouchableOpacity>}
      {item.customer_latitude && item.customer_longitude && serviceType === "Marketing" ? (
        <TouchableOpacity onPress={openInGoogleMaps}>
          <Text style={[styles.cell, { color: '#4287f5', textDecorationLine: 'underline' }]}>Open Location in Google Maps</Text>
        </TouchableOpacity>
      ):serviceType === "Marketing" &&(
        <TouchableOpacity onPress={openInGoogleMaps}>
          <Text style={[styles.cell, { color: '#4287f5', textDecorationLine: 'underline' }]}>Location not attached</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.cell}>{moment(item.createdAt).format('YYYY-MM-DD HH:mm')}</Text>
    </View>
    )
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={styles.filterContainer}>
        {['All', 'Sales', 'Service', 'Marketing'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.filterButton, serviceType === type && styles.selectedFilteredButton]}
            onPress={() => setServiceType(type)}
          >
            <Text style={[styles.filterText, serviceType === type && styles.selectedFilterText]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={tw`flex-row justify-around mx-2 my-2`}>
        {/* <TouchableOpacity
          style={tw`bg-gray-200 p-2 rounded`}
          onPress={() => setShowFromPicker(true)}
        >
          <Text>{fromDate ? moment(fromDate).format('YYYY-MM-DD') : 'From Date'}</Text>
        </TouchableOpacity> */}
        <DateTimePicker
          value={fromDate ? new Date(fromDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowFromPicker(false);
            if (selectedDate) setFromDate(selectedDate);
          }}
        />
        <DateTimePicker
          value={toDate ? new Date(toDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowToPicker(false);
            if (selectedDate) setToDate(selectedDate);
          }}
        />
      </View>

      


      <TouchableOpacity onPress={exportToExcel} style={tw`bg-[#092147] h-10 mx-4 items-center rounded-full`}>
        <Text style={tw`text-white font-bold mt-2`}>Export to Excel</Text>
      </TouchableOpacity>

      <ScrollView horizontal={true}>
        <View style={styles.table}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Seller Phone</Text>
            <Text style={styles.headerText}>Customer Name</Text>
            {serviceType === "Marketing" && <Text style={styles.headerText}>Shop Name</Text>}
            {serviceType === "All" && <Text style={styles.headerText}>Service Type</Text>}
            {serviceType!=="Marketing"&&<Text style={styles.headerText}>Product Name</Text>}
            {serviceType!=="Marketing"&&<Text style={styles.headerText}>Price</Text>}
            {serviceType !== "Marketing" && <Text style={styles.headerText}>Discount</Text>}
            {serviceType !== "Marketing" && <Text style={styles.headerText}>Final Price</Text>}
            {serviceType === "Marketing" && <Text style={styles.headerText}>Address</Text>}
            {serviceType === "Marketing" && <Text style={styles.headerText}>City</Text>}
            {serviceType === "Marketing" && <Text style={styles.headerText}>State</Text>}
            {serviceType === "Marketing" && <Text style={styles.headerText}>Pincode</Text>}
            {serviceType === "Marketing" && <Text style={styles.headerText}>Shop Image</Text>}
            {serviceType === "Marketing" && <Text style={styles.headerText}>Location</Text>}
            {serviceType!=="Marketing"&&<Text style={styles.headerText}>Payment Method</Text>}
            <Text style={styles.headerText}>Date and Time</Text>
          </View>

          <FlatList
            data={filteredEmployees}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </View>

      </ScrollView>
      <Modal visible={isModalVisible} transparent={true} onDismiss={() => setIsModalVisible(false)}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Image
        source={{ uri: selectedImageUri }}
        style={styles.modalImage}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  table: {
    padding: 10,
    paddingBottom: 50,
    backgroundColor: '#f5f5f5',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height:screenHeight*0.8
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: screenHeight * 0.8,
    width: screenWidth * 0.9,
  },
  modalImage: {
    width: '100%',
    height: screenHeight * 0.5,
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#092450',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  selectedFilteredButton: {
    backgroundColor: '#092450',
  },
  filterText: {
    color: '#092450',
    fontWeight: 'bold',
  },
  selectedFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    padding: 10,
    marginBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    width: 100,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 2,
    backgroundColor: '#fff',
  },
  cell: {
    width: 100,
    textAlign: 'center',
    padding: 5,
  },
});

export default EmployeeTable;
