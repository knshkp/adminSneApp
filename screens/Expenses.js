import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import FormData from 'form-data';
import { SafeAreaView } from 'react-native-safe-area-context';
const ExpenseItem = ({ expense, onImagePress }) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>Expense Type: {expense.expense_type}</Text>
    <Text style={styles.itemText}>Mode of Payment: {expense.mode_payment}</Text>
    <Text style={styles.itemText}>Amount: {expense.amount}</Text>
    {expense.photo && (
      <TouchableOpacity onPress={() => onImagePress(`${expense.photo}`)}>
        <Text>Show Bill</Text>
        <Image source={{ uri: `https://sangramindustry-i5ws.onrender.com:3000/${expense.photo}` }} style={styles.image} />
      </TouchableOpacity>
    )}
  </View>
);

const Expenses = () => {
  const [modeOfExpense, setModeOfExpense] = useState('');
  const [modeOfPayment, setModeOfPayment] = useState('');
  const [paymentQuantity, setPaymentQuantity] = useState('');
  const [photoUri, setPhotoUri] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState('');

  useEffect(() => {
    fetchExpenses(); // Fetch expenses when the component mounts
  }, []);

  const fetchExpenses = () => {
    setLoading(true);
    axios
      .get('https://sangramindustry-i5ws.onrender.com:3000/employee/getExpense')
      .then((response) => {
        setExpenses(response.data);
        console.log(response)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

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
      url: 'https://sangramindustry-i5ws.onrender.com:3000/shop/addExpense',
      headers: { 
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setLoading(false);
        console.log(JSON.stringify(response.data));
        fetchExpenses(); // Refresh the list after adding a new expense
        setModeOfExpense('');
        setModeOfPayment('');
        setPaymentQuantity('');
        setPhotoUri('');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add New Expense</Text>

      <TextInput
        style={styles.input}
        placeholder="Expense Type"
        value={modeOfExpense}
        onChangeText={setModeOfExpense}
        placeholderTextColor="#888"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Payment Mode"
        value={modeOfPayment}
        onChangeText={setModeOfPayment}
        placeholderTextColor="#888"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={paymentQuantity}
        onChangeText={setPaymentQuantity}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />
      
      <TouchableOpacity style={styles.photoButton} onPress={selectPhoto}>
        <Text style={styles.photoButtonText}>Select Photo</Text>
      </TouchableOpacity>
      {photoUri ? <Image source={{ uri: photoUri }} style={styles.imagePreview} /> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#4287f5" /> // Display the loading spinner when loading is true
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={addExpense} disabled={loading}>
          <Text style={styles.addButtonText}>Save</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.header}>Expense List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4287f5" /> // Loading indicator for fetching expenses
      ) : (
        <FlatList
          data={expenses}
          renderItem={({ item }) => <ExpenseItem expense={item} onImagePress={handleImagePress} />}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
      )}

      {/* Modal for Image Preview */}
      <Modal visible={isModalVisible} transparent={true} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: selectedImageUri }} style={styles.modalImage} />
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  photoButton: {
    backgroundColor: '#4287f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Expenses;
