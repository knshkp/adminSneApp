import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Button, Card, Title, Paragraph, TextInput as PaperTextInput } from 'react-native-paper';

// Mock function to simulate an API call to get sales data
const fetchSalesData = async () => {
  // Replace this with your actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(5000); // Example sales amount
    }, 1000);
  });
};

const ExpenseItem = ({ expense }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Paragraph>Mode of Expense: {expense.modeOfExpense}</Paragraph>
      <Paragraph>Mode of Payment: {expense.modeOfPayment}</Paragraph>
      <Paragraph>Payment Quantity: {expense.paymentQuantity}</Paragraph>
    </Card.Content>
  </Card>
);

const  = () => {
  const [employeeDetail, setEmployeeDetail] = useState('');
  const [amountOfSales, setAmountOfSales] = useState(0);
  const [amountOfService, setAmountOfService] = useState('');
  const [amountOfMarketing, setAmountOfMarketing] = useState('');
  const [modeOfExpense, setModeOfExpense] = useState('');
  const [modeOfPayment, setModeOfPayment] = useState('');
  const [paymentQuantity, setPaymentQuantity] = useState('');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getSalesData = async () => {
      const sales = await fetchSalesData();
      setAmountOfSales(sales);
    };

    getSalesData();
  }, []);

  const addExpense = () => {
    const newExpense = { modeOfExpense, modeOfPayment, paymentQuantity };
    setExpenses([...expenses, newExpense]);
    setModeOfExpense('');
    setModeOfPayment('');
    setPaymentQuantity('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileSection}>
          <Title style={styles.header}>Profile</Title>
          
          <PaperTextInput
            style={styles.input}
            label="Employee Detail"
            value={employeeDetail}
            onChangeText={setEmployeeDetail}
            mode="outlined"
          />
          
          <Card style={styles.card}>
            <Card.Content>
              <Title>Sales This Month</Title>
              <Paragraph>${amountOfSales}</Paragraph>
            </Card.Content>
          </Card>
          
          <PaperTextInput
            style={styles.input}
            label="Amount of Service"
            value={amountOfService}
            onChangeText={setAmountOfService}
            mode="outlined"
            keyboardType="numeric"
          />
          
          <PaperTextInput
            style={styles.input}
            label="Amount of Marketing"
            value={amountOfMarketing}
            onChangeText={setAmountOfMarketing}
            mode="outlined"
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.expensesSection}>
          <Title style={styles.header}>Expenses</Title>
          
          <PaperTextInput
            style={styles.input}
            label="Mode of Expense"
            value={modeOfExpense}
            onChangeText={setModeOfExpense}
            mode="outlined"
          />
          
          <PaperTextInput
            style={styles.input}
            label="Mode of Payment"
            value={modeOfPayment}
            onChangeText={setModeOfPayment}
            mode="outlined"
          />
          
          <PaperTextInput
            style={styles.input}
            label="Payment Quantity"
            value={paymentQuantity}
            onChangeText={setPaymentQuantity}
            mode="outlined"
            keyboardType="numeric"
          />
          
          <Button mode="contained" onPress={addExpense} style={styles.button}>
            Add Expense
          </Button>
          
          <FlatList
            data={expenses}
            renderItem={({ item }) => <ExpenseItem expense={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  expensesSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#6200ea',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#6200ea',
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#e3f2fd',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Profile;
