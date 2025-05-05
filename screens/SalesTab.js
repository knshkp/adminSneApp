import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import tw from 'tailwind-react-native-classnames';
import { useState } from 'react';
const SalesTab = ({
  activeTab,
  setActiveTab,
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
  address,
  setAddress,
  openCategory,
  setOpenCategory,
  category,
  setCategory,
  categoryItems,
  setCategoryItems,
  openProduct,
  setOpenProduct,
  product,
  setProduct,
  productItems,
  setProductItems,
  price,
  setPrice,
  discount,
  setDiscount,
  open,
  setOpen,
  paymentSelect,
  setPaymentSelect,
  items,
  setItems,
  addApi,
  printBill,
}) => {
  const [salesActive,setSalesActiveTab]=useState('Sales');
  return (
    <>
      {/* Tabs */}
      <View style={tw`flex-row m-2 ml-4`}>
        <TouchableOpacity
          style={[styles.tab, salesActive === 'Sales'&& styles.activeTab]}
          onPress={() => setSalesActiveTab('Sales')}
        >
          <Text style={styles.tabText}>Sales</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, salesActive === 'cashSales' && styles.activeTab]}
          onPress={() => setSalesActiveTab('cashSales')}
        >
          <Text style={styles.tabText}>Cash Sales</Text>
        </TouchableOpacity>
      </View>

      {/* Sales Form */}
      {(salesActive === 'Sales'&& activeTab!="cashSales") && (
        <>
          <View style={styles.dateTimeContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Customer Name"
              value={customerName}
              onChangeText={setCustomerName}
            />

            <TextInput
              style={styles.inputs}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={mobileNumber}
              maxLength={10}
              onChangeText={setMobileNumber}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />

          <DropDownPicker
            open={openCategory}
            value={category}
            items={categoryItems}
            setOpen={setOpenCategory}
            setValue={setCategory}
            setItems={setCategoryItems}
            placeholder="Select Category"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />

          {category && (
            <DropDownPicker
              open={openProduct}
              value={product}
              items={productItems}
              setOpen={setOpenProduct}
              setValue={setProduct}
              setItems={setProductItems}
              placeholder="Select Product"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          )}

          {product && (
            <Text style={styles.priceText}>Price: {price}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Discount (%)"
            keyboardType="numeric"
            value={discount}
            onChangeText={setDiscount}
          />

          {product && (
            <Text style={styles.priceText}>
              Final Price: {price - (discount * price) / 100}
            </Text>
          )}

          {product && (
            <DropDownPicker
              open={open}
              value={paymentSelect}
              items={items}
              setOpen={setOpen}
              setValue={setPaymentSelect}
              setItems={setItems}
              placeholder="Select Payment Method"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          )}
        </>
      )}

      {/* Cash Sales Form */}
      {salesActive === 'cashSales' && (
  <>
  {/* <Text>Hello Cash Sales</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
      />
    <TextInput
      style={styles.input}
      placeholder="Price"
      keyboardType="numeric"
      value={price ? String(price) : ''}
      onChangeText={(text) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setPrice(numericValue);
      }}
    />
  </>
)}


      {/* Submit Buttons */}
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity style={styles.button} onPress={addApi}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { addApi(); printBill(); }}>
          <Text style={styles.buttonText}>Submit & Print</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
    height: 50,
  },
  activeTab: {
    backgroundColor: '#192841',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
    color: "#333",
    backgroundColor: '#fff',
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
    color: "#333",
    backgroundColor: '#fff',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    height: 50,
  },
  dropdown: {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    width: '95%',
  },
  dropdownContainer: {
    borderRadius: 10,
    borderColor: '#ddd',
    marginHorizontal: 10,
  },
  priceText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#192841',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SalesTab;
