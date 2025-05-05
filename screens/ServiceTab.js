import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const ServiceTab = ({
  customerName, setCustomerName,
  mobileNumber, setMobileNumber,
  address, setAddress,
  openCategory, setOpenCategory,
  category, setCategory,
  categoryItems, setCategoryItems,
  openProduct, setOpenProduct,
  product, setProduct,
  productItems, setProductItems,
  price,
  discount, setDiscount,
  open, setOpen,
  paymentSelect, setPaymentSelect,
  items, setItems,
  addApi
}) => {
  return (
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
          maxLength={10}
          value={mobileNumber}
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

      {paymentSelect === 'upi' && (
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Text style={styles.qrText}>Scan this QR code to pay via UPI:</Text>
          <Image
            source={{
              uri: "https://imgs.search.brave.com/mNOSUEuvzvmR_GB5ndP8qE_R1mFIUliIU4pn-oDjIEk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jMS5p/bWcycXIuY29tL2lt/YWdlcy9zaW1wbGVf/cXJjb2RlLnBuZz94/LW9zcy1wcm9jZXNz/PWltYWdlL3F1YWxp/dHksUV84MA"
            }}
            style={{ height: 160, width: 160 }}
          />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={addApi}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        paddingVertical: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    customerNameText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        paddingLeft:10
      },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#ddd',
        marginHorizontal: 5,
        height:50
    },
    activeTab: {
        backgroundColor: '#192841',
    },
    tabText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    salesContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    dateText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#192841',
        marginLeft:20,
        fontWeight:'bold'
    },
    datesText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#192841',
        marginLeft:150,
        marginRight:20,
        fontWeight:'bold'
    },
    dropdown: {
        marginBottom: 10,
        marginTop:10,
        borderRadius: 10,
        marginHorizontal:10,
        marginRight:10,
        width:'95%'
    },
    dropdownContainer: {
        borderRadius: 10,
        borderColor: '#ddd',
        marginHorizontal:10,
    },
    input: {
        height:50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        paddingHorizontal: 5,
        marginHorizontal:10,
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
        marginHorizontal:10,
        marginBottom: 5,
        paddingHorizontal:5,
        color: "#333",
        backgroundColor: '#fff',
        width: '45%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        height:50
    },
    inputd: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        marginHorizontal:10,
        marginBottom: 5,
        paddingHorizontal:5,
        color: "#333",
        backgroundColor: '#fff',
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        height:50
    },
    priceText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#192841',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal:20,
        paddingHorizontal:15
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    marketingText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:350
    },
    namePhoneContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default ServiceTab;
