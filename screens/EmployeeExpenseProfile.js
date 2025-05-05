import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Modal, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { launchImageLibrary } from 'react-native-image-picker';
import { TextInput } from 'react-native-paper';
const EmployeeExpenseReport = () => {
  const [modeOfExpense, setModeOfExpense] = useState('');
  const [modeOfPayment, setModeOfPayment] = useState('');
  const [paymentQuantity, setPaymentQuantity] = useState('');
    const [photoUri, setPhotoUri] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible,setIsAddModalVisible]=useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);
  const addExpense = () => {
    setLoading(true);

    const data = new FormData();
    data.append('seller_phone', '9694668873');
    data.append('amount', paymentQuantity);
    data.append('expense_type', modeOfExpense);
    data.append('mode_payment', modeOfPayment);

    if (photoUri) {
      const fileName = photoUri.split('/').pop();
      const fileType = fileName.split('.').pop();
      data.append('expenseImage', {
        uri: photoUri,
        name: fileName,
        type: `image/${fileType}`,
      });
    }

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/shop/addExpense',
      headers: { 
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };
    console.log(`>>>>>>>${JSON.stringify(config)}`)

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        fetchExpenses();
        setModeOfExpense('');
        setModeOfPayment('');
        setPaymentQuantity('');
        setPhotoUri('');
        setIsAddModalVisible(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://sangramindustry-i5ws.onrender.com/employee/getExpense');
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
    const selectPhoto = () => {
      launchImageLibrary({}, (response) => {
        if (response.assets && response.assets.length > 0) {
          setPhotoUri(response.assets[0].uri);
        }
      });
    };
  

  const handleImagePress = (uri) => {
    setSelectedImageUri(uri);
    setIsModalVisible(true);
  };

  const renderItem = ({ item }) => {
    const createdAt = new Date(item.createdAt);
    const formattedDate = createdAt.toLocaleDateString();
    const formattedTime = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <View style={styles.tableRow}>
        <Text style={styles.cell}>{item.expense_type}</Text>
        <Text style={styles.cell}>{item.mode_payment}</Text>
        <Text style={styles.cell}>{item.amount}</Text>
        <Text style={styles.cell}>{formattedDate}</Text>
        <Text style={styles.cell}>{formattedTime}</Text>
        <TouchableOpacity onPress={() => handleImagePress(`${item.photo}`)}>
          <Text style={[styles.cell, { color: '#4287f5', textDecorationLine: 'underline' }]}>View</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <TouchableOpacity style={styles.addExpenseButton} onPress={() => setIsAddModalVisible(true)}>
                <Text style={styles.addExpenseButtonText}>Add Expense</Text>
              </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#4287f5" style={tw`mt-20`} />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Expense Type</Text>
              <Text style={styles.headerText}>Payment Type</Text>
              <Text style={styles.headerText}>Amount</Text>
              <Text style={styles.headerText}>Date</Text>
              <Text style={styles.headerText}>Time</Text>
              <Text style={styles.headerText}>Photo</Text>
            </View>

            <FlatList
              data={expenses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      )}

      {/* Modal for viewing image */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: selectedImageUri }} style={styles.modalImage} resizeMode="contain" />
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
       <Modal visible={isAddModalVisible} animationType="slide" transparent={true} onRequestClose={() => setIsAddModalVisible(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <TextInput
                      style={styles.input}
                      placeholder="Expense Type"
                      value={modeOfExpense}
                      onChangeText={setModeOfExpense}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Payment Mode"
                      value={modeOfPayment}
                      onChangeText={setModeOfPayment}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Amount"
                      value={paymentQuantity}
                      onChangeText={setPaymentQuantity}
                      keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.photoButton} onPress={selectPhoto}>
                      <Text style={styles.photoButtonText}>Select Photo</Text>
                    </TouchableOpacity>
                    {photoUri ? <Image source={{ uri: photoUri }} style={styles.imagePreview} /> : null}
      
                    <TouchableOpacity style={styles.modalButton} onPress={addExpense}>
                      <Text style={styles.modalButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'red' }]} onPress={() => setIsAddModalVisible(false)}>
                      <Text style={styles.modalButtonText}>Cancel</Text>
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
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#4287f5',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
    minWidth: 800,
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white',
    width: 120,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    minWidth: 800,
  },
  cell: {
    width: 120,
    textAlign: 'center',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addExpenseButton: {
    backgroundColor: '#28a745',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addExpenseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    width: 250,
  }, photoButton: {
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default EmployeeExpenseReport;
