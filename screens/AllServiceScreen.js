import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Table, Row, Rows } from 'react-native-table-component';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
const EmployeeServicesAll = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All'); // New state for filter type
  
  // Function to fetch employee data from the API
  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('https://sangramindustry-i5ws.onrender.com/employeeServices/getEmployee?phone=9694668873');
      if (response.data && response.data.result) {
        console.log(response.data)
        setEmployeeData(response.data.result);
        const data = response.data.result.map(item => [
          item.customer_name,
          item.customer_phone,
          item.customer_address,
          item.category_name,
          item.product_name,
          `Rs. ${item.product_price}`,
          `${item.discount}%`,
          `Rs. ${item.final_price}`,
          item.payment_method,
          item.service_type,
          item.seller_phone
        ]);

        setTableData(data);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  // Filter table data based on search input and selected filter type
  const filteredData = tableData.filter(row => {
    const matchesSearch = search
      ? row.some(cell => String(cell).toLowerCase().includes(search.toLowerCase()))
      : true;
  
    const matchesFilter = filter === 'All' || row[9] === filter;
  
    return matchesSearch && matchesFilter;
  });
  
  

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'Sales' && styles.activeFilterButton]}
              onPress={() => setFilter('Sales')}
            >
              <Text style={styles.filterButtonText}>Sales</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'Service' && styles.activeFilterButton]}
              onPress={() => setFilter('Service')}
            >
              <Text style={styles.filterButtonText}>Service</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === 'All' && styles.activeFilterButton]}
              onPress={() => setFilter('All')}
            >
              <Text style={styles.filterButtonText}>All</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={search}
            onChangeText={text => setSearch(text)}
          />
          <ScrollView horizontal style={styles.scrollView}>
            <View style={styles.tableContainer}>
              <Table borderStyle={styles.tableBorder}>
                <Row
                  data={['Customer Name', 'Phone', 'Address', 'Category', 'Product', 'Price', 'Discount', 'Final Price', 'Payment', 'Service Type',"Seller Phone"]}
                  style={styles.header}
                  textStyle={styles.headerText}
                />
                <Rows data={filteredData} textStyle={styles.text} style={styles.row} />
              </Table>
            </View>
          </ScrollView>
        </>
      )}
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9', // Slightly lighter gray background
  },
  searchInput: {
    height: 45,
    borderColor: '#b0b0b0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    elevation: 2, // Adding shadow to the search input
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filterButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#007bff',
    marginHorizontal: 5,
  },
  activeFilterButton: {
    backgroundColor: '#0056b3', // Darker blue for active filter
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  tableContainer: {
    flexDirection: 'column',
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#ddd', // Lighter border color
  },
  header: {
    height: 60,
    backgroundColor: '#007bff', // Changed to a more vibrant blue
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#000', // Subtle shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff', // White text for the header
    fontSize: 16,
    width: 140,
  },
  text: {
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 14,
    width: 140,
    color: '#333', // Darker text color for readability
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // Light border for rows
    backgroundColor: '#fff', // White background for rows
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});

export default EmployeeServicesAll;
