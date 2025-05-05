import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
// import styles from "./Stylesheets/EmployeeHome.js";
import { StyleSheet } from "react-native";
const MarketingTab = ({
  customerName, setCustomerName,
  mobileNumber, setMobileNumber,
  shop, setShop,
  address, setAddress,
  pin, setPin,
  city, setCity,
  state, setState,
  image, setImage,
  openCategory, setOpenCategory,
  category, setCategory,
  marketingCategory, setMarketingCategory,
  open, setOpen,
  paymentSelect, setPaymentSelect,
  items, setItems,
  fetchState,
  fetchLocation,
  pickImage,
  addMarketingEntry,
  // Add all focus states here
  isFocused, setIsFocused,
  isMobileFocused, setIsMobileFocused,
  isShopFocused, setIsShopFocused,
  isAddressFocused, setIsAddressFocused,
  isPincodeFocused, setIsPincodeFocused,
  isCityFocused, setIsCityFocused,
  isStateFocused, setIsStateFocused,
  product // also you are using `product` but it was missing
}) => {
  const [locationCaptured, setLocationCaptured] = useState(false);
  const [photoPicked, setPhotoPicked] = useState(false);

  const handlePickImage = async () => {
    const result = await pickImage(); // Make sure pickImage returns the result
    if (result) {  // If image picked successfully
      setPhotoPicked(true);
    }
  };

  const handlePress = async () => {
    await fetchLocation();
    setLocationCaptured(true);
  };
  return (
    <>
      <View style={styles.dateTimeContainer}>
        {/* Customer Name Input */}
        <View>
          {(isFocused || customerName) && (
            <Text style={styles.customerNameText}>Customer Name</Text>
          )}
          <TextInput
            style={styles.inputd}
            placeholder="Enter Customer Name"
            value={customerName}
            onChangeText={setCustomerName}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>

        {/* Mobile Number Input */}
        <View>
          {(isMobileFocused || mobileNumber) && (
            <Text style={styles.customerNameText}>Mobile Number</Text>
          )}
          <TextInput
            style={styles.inputd}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            onFocus={() => setIsMobileFocused(true)}
            onBlur={() => setIsMobileFocused(false)}
          />
        </View>
      </View>

      {/* Category Dropdown */}
      <DropDownPicker
        open={openCategory}
        value={category}
        items={marketingCategory}
        setOpen={setOpenCategory}
        setValue={setCategory}
        setItems={setMarketingCategory}
        placeholder="Select Category"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* Shop Name Input */}
      <View>
        {(isShopFocused || shop) && (
          <Text style={styles.customerNameText}>Shop Name</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Shop Name"
          value={shop}
          onChangeText={setShop}
          onFocus={() => setIsShopFocused(true)}
          onBlur={() => setIsShopFocused(false)}
        />
      </View>

      {/* Address Input */}
      <View>
        {(isAddressFocused || address) && (
          <Text style={styles.customerNameText}>Address</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          onFocus={() => setIsAddressFocused(true)}
          onBlur={() => setIsAddressFocused(false)}
        />
      </View>

      {/* Pincode Input */}
      <View>
        {(isPincodeFocused || pin) && (
          <Text style={styles.customerNameText}>PinCode</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          value={pin}
          keyboardType="phone-pad"
          maxLength={6}
          onChangeText={(text) => {
            setPin(text);
            if (text.length === 6) {
              fetchState(text);
            }
          }}
          onFocus={() => setIsPincodeFocused(true)}
          onBlur={() => setIsPincodeFocused(false)}
        />
      </View>

      {/* City and State Input */}
      <View style={styles.dateTimeContainer}>
        <View>
          {(isCityFocused || city) && (
            <Text style={styles.customerNameText}>City</Text>
          )}
          <TextInput
            style={styles.inputd}
            placeholder="City"
            value={city}
            onChangeText={setCity}
            onFocus={() => setIsCityFocused(true)}
            onBlur={() => setIsCityFocused(false)}
          />
        </View>

        <View>
          {(isStateFocused || state) && (
            <Text style={styles.customerNameText}>State</Text>
          )}
          <TextInput
            style={styles.inputd}
            placeholder="State"
            value={state}
            onChangeText={setState}
            onFocus={() => setIsStateFocused(true)}
            onBlur={() => setIsStateFocused(false)}
          />
        </View>
      </View>

      {/* Payment Dropdown */}
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

      {/* Location and Image Upload Buttons */}
      <View style={styles.dateTimeContainer}>
      <TouchableOpacity
      style={{
        backgroundColor: locationCaptured ? 'green' : '#192841',
        padding: 12,
        marginVertical: 8,
        borderRadius: 10,
        marginHorizontal: 15,
        opacity: locationCaptured ? 0.6 : 1, // Optional: make disabled button look faded
      }}
      onPress={locationCaptured ? null : handlePress}
      disabled={locationCaptured}
    >
      <Text style={{ color: 'white' }}>
        {locationCaptured ? 'Location Captured' : 'Get Location'}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        backgroundColor: photoPicked ? 'green' : '#192841',
        padding: 12,
        marginVertical: 8,
        borderRadius: 10,
        opacity: photoPicked ? 0.6 : 1, // Faded look after success
      }}
      onPress={photoPicked ? null : handlePickImage}
      disabled={photoPicked}
    >
      <Text style={{ color: 'white' }}>
        {photoPicked ? 'Photo Uploaded' : 'Upload Photo'}
      </Text>
    </TouchableOpacity>
      </View>

      {/* Image Selected Text */}
      {/* {image && <Text style={{ marginBottom: 8 }}>Image Selected: {image}</Text>} */}

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={addMarketingEntry}>
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

export default MarketingTab;
