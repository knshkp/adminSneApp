import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import XLSX from 'xlsx';
import tw from 'twrnc';
import moment from 'moment';
const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [serviceType, setServiceType] = useState('All'); // State for the selected filter

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const response = await fetch("https://sangramindustry-i5ws.onrender.com/employeeServices/getEmployee?phone=9694668873");
      const data = await response.json();
      setEmployees(data.result);
      console.log(data.result)
      setFilteredEmployees(data.result);
    };

    fetchEmployeeData();
  }, []);


  const exportToExcel = async () => {
    try {
      const data = employees.map((vendor, index) => ({
        id: index + 1,
        seller_phone:vendor.seller_phone,
        vendor_name: vendor.customer_name,
        shop_name:vendor.shop_name,
        phone_number: vendor.service_type,
        product: vendor.product_name,
        price: vendor.product_price,
        discount: vendor.discount,
        final_price: vendor.final_price,
        discount: vendor.discount,
        createdAt: vendor.createdAt,
        
      }));
  
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Employees');
      
      const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
      const uniqueFileName = `Services_${moment().format('YYYYMMDD_HHmmss')}.xlsx`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${uniqueFileName}`;
  
      // Save the file locally
      await RNFS.writeFile(filePath, wbout, 'base64');
      console.log(`File saved to ${filePath}`);
  
      // Share the file
      await Share.open({
        url: `file://${filePath}`, // Shareable file path
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        filename: uniqueFileName,
      });
  
      console.log('File shared successfully!');
    } catch (error) {
      console.error('Error exporting or sharing file:', error);
    }
  };
  

  // Function to filter data by service type
  const filterData = (type) => {
    setServiceType(type);
    if (type === 'All') {
      setFilteredEmployees(employees); // Show all if "All" is selected
    } else {
      const filtered = employees.filter(employee => employee.service_type.toLowerCase() === type.toLowerCase());
      setFilteredEmployees(filtered); // Filter based on the service type
    }
  };

  // Render a row of data
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.seller_phone}</Text>
      <Text style={styles.cell}>{item.customer_name}</Text>
      {serviceType=="Marketing"?<Text style={styles.cell}>{item.shop_name}</Text>:""}
      {serviceType=="All"?<Text style={styles.cell}>{item.service_type}</Text>:""}
      <Text style={styles.cell}>{item.product_name}</Text>
      <Text style={styles.cell}>{item.product_price}</Text>
      {serviceType!="Marketing"?<Text style={styles.cell}>{item.discount}</Text>:""}
      {serviceType!="Marketing"?<Text style={styles.cell}>{item.final_price}</Text>:""}
      <Text style={styles.cell}>{item.payment_method}</Text>
      <Text style={styles.cell}>{item.createdAt}</Text>
    </View>
  );

  return (
    <>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, serviceType === 'All' && styles.selectedFilteredButton]} 
          onPress={() => filterData('All')}>
          <Text style={[styles.filterText,serviceType === 'All'&&styles.selectedFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, serviceType === 'Sales' && styles.selectedFilteredButton]} 
          onPress={() => filterData('Sales')}>
          <Text style={[styles.filterText,serviceType === 'Sales'&&styles.selectedFilterText]}>Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, serviceType === 'Service' && styles.selectedFilteredButton]} 
          onPress={() => filterData('Service')}>
          <Text style={[styles.filterText,serviceType === 'Service'&&styles.selectedFilterText]}>Service</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, serviceType === 'Marketing' && styles.selectedFilteredButton]} 
          onPress={() => filterData('Marketing')}>
          <Text style={[styles.filterText,serviceType === 'Marketing'&&styles.selectedFilterText]}>Marketing</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={exportToExcel} style={tw`bg-[#092147] h-10 mx-4 items-center  rounded-full`}>
                <Text style={tw`text-white font-bold mt-2`}>Export to Excel</Text>
      </TouchableOpacity>

      <ScrollView horizontal={true}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Seller Phone</Text>
            <Text style={styles.headerText}>Customer Name</Text>
            {serviceType=="Marketing"?<Text style={styles.headerText}>Shop Name</Text>:""}
            {serviceType=="All"?<Text style={styles.headerText}>Service Type</Text>:""}
            <Text style={styles.headerText}>Product Name</Text>
            <Text style={styles.headerText}>Price</Text>
            {serviceType!="Marketing"?<Text style={styles.headerText}>Discount</Text>:""}
            {serviceType!="Marketing"?<Text style={styles.headerText}>Final Price</Text>:""}
            <Text style={styles.headerText}>Payment Method</Text>
            <Text style={styles.headerText}>Date and Time</Text>
          
          </View>

          {/* Table Body */}
          <FlatList
            data={filteredEmployees}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      </ScrollView>
    </>
  );
};

// Styles for the table and cells
const styles = StyleSheet.create({
  table: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    padding: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#fff',
    color:"black",
    borderRadius: 5,
  },
  selectedFilteredButton: {
    backgroundColor: '#092450', // Change background color when selected
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
