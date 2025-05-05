import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,FlatList,SafeAreaView } from 'react-native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import tw from 'tailwind-react-native-classnames';
import { Dropdown } from 'react-native-element-dropdown';
import { Image } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Printer, PrintTypes } from 'react-native-thermal-receipt-printer';
import * as ImagePicker from 'react-native-image-picker'; // For selecting images
import Geolocation from '@react-native-community/geolocation';
import SalesTab from './SalesTab';
import MarketingTab from './MarketingTab';
import ServiceTab from './ServiceTab';
import ImageResizer from 'react-native-image-resizer';
import { useFocusEffect } from '@react-navigation/native';
import { getFileSize } from 'react-native-fs';
const EmployeeHome = () => {
    const [vendors, setVendors] = useState([]);
    const [items, setItems] = useState([
        { label: 'Cash', value: 'cash' },
        { label: 'UPI', value: 'upi' },
      ]);
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Marketing');
    const [categories, setCategories] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city,setCity]=useState('')
    const [state,setState]=useState('')
    const [pin,setPin]=useState('') 
    const [paymentSelect, setPaymentSelect] = useState('');
    const [category, setCategory] = useState('');
    const [discount, setDiscount] = useState('');
    const [finalPrice, setFinalPrice] = useState('');
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [productItems, setProductItems] = useState([]);
    const [openProduct, setOpenProduct] = useState(false);
    const [categoryItems, setCategoryItems] = useState([]);
    const [openCategory, setOpenCategory] = useState(false);
    const [price, setPrice] = useState('');
    const [dairy,setDairy]=useState('');
    const [machine,setMachine]=useState('');
    const [shop,setShop]=useState('')
    const [details,setDetails]=useState([]);
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isMobileFocused,setIsMobileFocused]=useState(false);
    const [isShopFocused,setIsShopFocused]=useState(false);
    const [isAddressFocused,setIsAddressFocused]=useState(false);
    const [isPincodeFocused,setIsPincodeFocused]=useState(false);
    const [isCityFocused,setIsCityFocused]=useState(false);
    const [isStateFocused,setIsStateFocused]=useState(true);
    const checkFileSize = async (uri) => {
        try {
          const fileStats = await getFileSize(uri);
          const fileSizeInMB = fileStats / 1024 / 1024; // Convert bytes to MB
          return fileSizeInMB;
        } catch (error) {
          console.error('Error getting file size:', error);
          return 0;
        }
      };
      
      // Check size before uploading
      
      const compressImage = async (imageUri) => {
        try {
          // Resize the image to 800x600 and reduce quality to 50%
          const resizedImage = await ImageResizer.createResizedImage(imageUri, 800, 600, 'JPEG', 50);
          console.log('Compressed Image URI:', resizedImage.uri);
          return resizedImage.uri;
        } catch (error) {
          console.log('Error compressing image:', error);
          return imageUri; // If compression fails, return the original URI
        }
      };


    const [marketingCategory, setMarketingCategory] = useState([
        { label: "Weighing Scale", value: "weighing_scale" },
        { label: "Dairy Products", value: "dairy_products" },
        { label: "Dairy Machines", value: "dairy_machines" }
      ]);
      
    const fetchLocation = () => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            Alert.alert("Location fetched", `Lat: ${latitude}, Long: ${longitude}`);
          },
          (error) => Alert.alert("Error", "Unable to fetch location"),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      };
    
      const pickImage = () => {
        const options = {
          mediaType: 'photo', // important to specify
          noData: true,
        };
      
        ImagePicker.launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else if (response.assets && response.assets.length > 0) {
            const selectedImage = response.assets[0];
            console.log('Selected Image:', selectedImage);
      
            setImage({
              uri: selectedImage.uri,
              type: selectedImage.type,
              name: selectedImage.fileName || `photo_${Date.now()}.jpg`,
            });
          }
        });
      };
    const addApi = async () => {
        console.log('>>>>>>')
        const employeeDetails=await AsyncStorage.getItem('userDetails')
        // console.log(employeeDetails)
        const finalEmployee=JSON.parse(employeeDetails)
        console.log(finalEmployee)
        const body = {
          seller_phone: finalEmployee?.phone_number,
          customer_name: customerName,
          customer_phone: mobileNumber,
          customer_address: address,
          category_name: category,
          product_name: product,
          product_price: price,
          discount: discount,
          final_price: price - (discount * price) / 100,
          payment_method: paymentSelect,
          service_type: activeTab
        };
        console.log(`>>>>>>>body>>>>.${body}`);
      
        try {
          const response = await axios.post('https://sangramindustry-i5ws.onrender.com/employeeServices/addEmployeeService', body, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          Alert.alert('Employee Details Added')
      
          console.log(response.data);
        } catch (error) {
            Alert.alert('Detail Not Added')
          console.error('There was a problem with the axios operation:', error);
        }
      };
      const printBill = async () => {
        try {
            // Ensure that the printer is connected (you may need to pair it with the device)
            const isConnected = await Printer.isPrinterConnected();
            if (!isConnected) {
                Alert.alert('Printer not connected');
                return;
            }
    
            const billContent = generateBill();
            await Printer.printText(billContent);
            await Printer.printText("\n\n\n"); // You can add more line breaks for formatting
            await Printer.cut(); // If your printer supports cutting the paper
    
            Alert.alert('Bill printed successfully!');
        } catch (error) {
            console.error('Printing failed', error);
            Alert.alert('Printing failed, please try again');
        }
    };
      const generateBill = () => {
        return `
        -----------------------------
        Bill Details
        -----------------------------
        Customer Name: ${customerName}
        Mobile Number: ${mobileNumber}
        Address: ${address}
        Category: ${category}
        Product: ${product}
        Price: ${price}
        Discount: ${discount}%
        Final Price: ${price - (discount * price) / 100}
        Payment Method: ${paymentSelect}
        -----------------------------
        Thank you for your purchase!
        -----------------------------
        `;
    };
    
      const fetchState = async (pinCode) => {
        if (!pinCode) return; // Prevent unnecessary API calls
        try {
            const api = `https://api.postalpincode.in/pincode/${pinCode}`;
            const response = await axios.get(api);
            const data = response.data;
            if (data[0]?.PostOffice?.length > 0) {
                const state = data[0].PostOffice[0].State;
                const city=data[0].PostOffice[0].Block;
                setState(state)
                setCity(city);
            } else {
                Alert.alert('Invalid Pincode');
            }
        } catch (error) {
            console.error('Error fetching state:', error);
        }
    };
    
    const addMarketingEntry = async () => {
      const employeeDetails = await AsyncStorage.getItem('userDetails');
      const finalEmployee = JSON.parse(employeeDetails);
      console.log(`>>>>>>${JSON.stringify(finalEmployee)}`);
    
      const formData = new FormData();
      formData.append('seller_phone', finalEmployee.phone_number);
      formData.append('customer_name', customerName);
      formData.append('customer_phone', mobileNumber);
      formData.append('customer_address', address);
      formData.append('customer_state', state);
      formData.append('customer_city', city);
      formData.append('customer_pincode', pin);
      formData.append('category_name', category);
      formData.append('service_type', activeTab);
      formData.append('shop_name', shop);
      formData.append('customer_latitude', location.latitude.toString());
      formData.append('customer_longitude', location.longitude.toString());
      const compressedImageUri = await compressImage(image.uri);
    //   const fileSize = await checkFileSize(compressedImageUri);
    //   if (fileSize > 10) {
    //     Alert.alert('Error', 'File size exceeds the 10MB limit!');
    //   } else {
    //     // Proceed with uploading the image
    //   }
    
      // Assuming `image` is an object like { uri, type, name }
      formData.append('file', {
        uri: compressedImageUri,
        type: image.type || 'image/jpeg',
        name: image.fileName || `photo_${Date.now()}.jpg`,
      });
      console.log('>>>> FormData:', formData);
      console.log(image);
    
      try {
        const response = await axios.post(
          'https://sangramindustry-i5ws.onrender.com/employeeServices/addEmployeeService',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(`>>>> Response: ${JSON.stringify(response)}`);
        Alert.alert('Marketing Details Added');
      } catch (error) {
        console.error('There was a problem with the axios operation:', error);
        Alert.alert('Detail Not Added');
      }
    };
    
    useFocusEffect(React.useCallback(() => {
        
        const fetchVendorData = async () => {
            try {
                const response = await fetch('https://sangramindustry-i5ws.onrender.com/employee/getEmployee?phone=8104450592');
                if (response.ok) {
                    const data = await response.json();
                    setVendors(data.result);
                } else {
                    console.error('Error fetching data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        const fetchCategories = async () => {
            try {
                const employeeDetails=await AsyncStorage.getItem('employeeDetails');
                console.log(`vendor name is ${details}`)
                setDetails(employeeDetails);
                const response = await fetch('https://sangramindustry-i5ws.onrender.com/shop/get_product');
                if (response.ok) {
                    const data = await response.json();
                    const categoryItems = data.data.data.map(cat => ({ label: cat.category, value: cat.category }));
                    setCategories(data.data.data);
                    setCategoryItems(categoryItems);
                } else {
                    console.error('Error fetching categories:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        console.log(details);

        fetchVendorData();
        fetchCategories();
    }, []));
    useFocusEffect(React.useCallback(()=>{
        const updateEntry=()=>{
            setCategory('');
            setAddress('');
            setCustomerName('');
            setShop('');
            setProduct("");
            setMobileNumber("");
            setPrice("");
            setDiscount("");
            setPaymentSelect("");
        }
        updateEntry()
    },[]));

    useEffect(() => {
        if (category) {
            const selectedCategory = categories.find(cat => cat.category === category);
            if (selectedCategory) {
                const productItems = selectedCategory.product.map(prod => ({ label: prod.product_name, value: prod.product_name }));
                setProducts(selectedCategory.product);
                setProductItems(productItems);
            } else {
                setProducts([]);
                setProductItems([]);
            }
        }
    }, [category]);

    useEffect(() => {
        if (product) {
            const selectedProduct = products.find(prod => prod.product_name === product);
            if (selectedProduct) {
                setPrice(selectedProduct.product_price);
            }
        }
    }, [product]);

    const renderContent = () => {
        if (activeTab === 'Sales') {
            return (
                <SalesTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                customerName={customerName}
                setCustomerName={setCustomerName}
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                address={address}
                setAddress={setAddress}
                openCategory={openCategory}
                setOpenCategory={setOpenCategory}
                category={category}
                setCategory={setCategory}
                categoryItems={categoryItems}
                setCategoryItems={setCategoryItems}
                openProduct={openProduct}
                setOpenProduct={setOpenProduct}
                product={product}
                setProduct={setProduct}
                productItems={productItems}
                setProductItems={setProductItems}
                price={price}
                setPrice={setPrice}
                discount={discount}
                setDiscount={setDiscount}
                open={open}
                setOpen={setOpen}
                paymentSelect={paymentSelect}
                setPaymentSelect={setPaymentSelect}
                items={items}
                setItems={setItems}
                addApi={addApi}
                printBill={printBill}
                />
            );
        } 
        else if (activeTab === 'Service') {
            return (
                <ServiceTab     
                    customerName={customerName}
                    setCustomerName={setCustomerName}
                    mobileNumber={mobileNumber}
                    setMobileNumber={setMobileNumber}
                    address={address}
                    setAddress={setAddress}
                    openCategory={openCategory}
                    setOpenCategory={setOpenCategory}
                    category={category}
                    setCategory={setCategory}
                    categoryItems={marketingCategory}
                    setCategoryItems={setMarketingCategory}
                    openProduct={false}
                    setOpenProduct={() => {}}
                    product={null}
                    setProduct={() => {}}
                    productItems={[]}
                    setProductItems={() => {}}
                    price={100}  // Example value
                    discount={0}  // Example value
                    setDiscount={() => {}}
                    open={false}
                    setOpen={() => {}}
                    paymentSelect={paymentSelect}
                    setPaymentSelect={setPaymentSelect}
                    items={items}
                    setItems={setItems}
                    addApi={addApi}
                />
            );
        } else if (activeTab === 'Marketing') {
            return (
                <MarketingTab
                    customerName={customerName}
                    setCustomerName={setCustomerName}
                    mobileNumber={mobileNumber}
                    setMobileNumber={setMobileNumber}
                    shop={shop}
                    setShop={setShop}
                    address={address}
                    setAddress={setAddress}
                    pin={pin}
                    setPin={setPin}
                    city={city}
                    setCity={setCity}
                    state={state}
                    setState={setState}
                    image={image}
                    setImage={setImage}
                    openCategory={openCategory}
                    setOpenCategory={setOpenCategory}
                    category={category}
                    setCategory={setCategory}
                    marketingCategory={marketingCategory}
                    setMarketingCategory={setMarketingCategory}
                    open={open}
                    setOpen={setOpen}
                    paymentSelect={paymentSelect}
                    setPaymentSelect={setPaymentSelect}
                    items={items}
                    setItems={setItems}
                    fetchState={fetchState}
                    fetchLocation={fetchLocation}
                    pickImage={pickImage}
                    addMarketingEntry={addMarketingEntry}
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                    isMobileFocused={isMobileFocused}
                    setIsMobileFocused={setIsMobileFocused}
                    isShopFocused={isShopFocused}
                    setIsShopFocused={setIsShopFocused}
                    isAddressFocused={isAddressFocused}
                    setIsAddressFocused={setIsAddressFocused}
                    isPincodeFocused={isPincodeFocused}
                    setIsPincodeFocused={setIsPincodeFocused}
                    isCityFocused={isCityFocused}
                    setIsCityFocused={setIsCityFocused}
                    isStateFocused={isStateFocused}
                    setIsStateFocused={setIsStateFocused}
                    product={product}
                />
            );
        }
    };

        return (    
            <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ flex: 1 }}>
                <SafeAreaView style={tw`flex-1 pb-36`}>
                    <View style={tw`flex-row m-2 ml-4`}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'Sales' && styles.activeTab]}
                            onPress={() => setActiveTab('Sales')}
                        >
                            <Text style={styles.tabText}>Sales</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'Marketing' && styles.activeTab]}
                            onPress={() => setActiveTab('Marketing')}
                        >
                            <Text style={styles.tabText}>Marketing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'Service' && styles.activeTab]}
                            onPress={() => setActiveTab('Service')}
                        >
                            <Text style={styles.tabText}>Service</Text>
                        </TouchableOpacity>
                    </View>
                    <View>{renderContent()}</View>
                </SafeAreaView>
            </ScrollView>
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

export default EmployeeHome;
