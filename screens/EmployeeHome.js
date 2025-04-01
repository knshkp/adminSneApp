import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,FlatList } from 'react-native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import tw from 'twrnc';
import { Dropdown } from 'react-native-element-dropdown';
import { Image } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Printer, PrintTypes } from 'react-native-thermal-receipt-printer';
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
                alert('Printer not connected');
                return;
            }
    
            const billContent = generateBill();
    
            // Print the bill to the thermal printer
            await Printer.printText(billContent);
            
            // Optional: Feed a line or cut the paper if the printer supports it
            await Printer.printText("\n\n\n"); // You can add more line breaks for formatting
            await Printer.cut(); // If your printer supports cutting the paper
    
            alert('Bill printed successfully!');
        } catch (error) {
            console.error('Printing failed', error);
            alert('Printing failed, please try again');
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
                alert('Invalid Pincode');
            }
        } catch (error) {
            console.error('Error fetching state:', error);
        }
    };

      const addMarketingEntry = async () => {
        const employeeDetails=await AsyncStorage.getItem('employeeDetails')
        const finalEmployee=JSON.parse(employeeDetails)
        const body = {
          seller_phone: finalEmployee[0].phone_number,
          customer_name: customerName,
          customer_phone: mobileNumber,
          customer_address: address,
          customer_state:state,
          customer_city:city,
          customer_pincode:pin,
          category_name: category,
          product_name: product,
          product_price: price,
          discount: discount,
          final_price: price - (discount * price) / 100,
          payment_method: paymentSelect,
          service_type: activeTab,
          shop_name:shop
        };
        console.log(body)
      
        try {
          const response = await axios.post('https://sangramindustry-i5ws.onrender.com/employeeServices/addEmployeeService', body, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          Alert.alert('Employee Details Added')
      
          console.log(`>>>>>>ewsponese${response.data}`);
        } catch (error) {
            Alert.alert('Detail Not Added')
          console.error('There was a problem with the axios operation:', error);
        }
      };

    useEffect(() => {
        
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
    }, []);
    useEffect(()=>{
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
    },[activeTab]);

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
                <>
                {/* <Text>Hi </Text>
                    <View style={styles.dateTimeContainer}>
                        <Text style={styles.dateText}>{moment().format('Do MMMM YYYY')}</Text>
                        <Text style={styles.datesText}>{moment().format('h:mm a')}</Text>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Text style={{marginLeft:12}}>Name</Text>
                        <Text style={{marginRight:120}}> Phone</Text>
                    </View> */}
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
                            propogateSwipe={true}
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
                        placeholder="Discount"
                        keyboardType="numeric"
                        value={discount}
                        onChangeText={setDiscount}
                    />
                    {product && (
                        <Text style={styles.priceText}>Final Price: {price - (discount * price) / 100}</Text>
                    )}
                    {product&&<DropDownPicker
                        open={open}
                        value={paymentSelect}
                        items={items}
                        setOpen={setOpen}
                        setValue={setPaymentSelect}
                        setItems={setItems}
                        placeholder="Select Payment Method"
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />}
                    <View style={styles.dateTimeContainer}>
                    <TouchableOpacity style={styles.button} onPress={addApi}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>{addApi(); printBill();}}>
                        <Text style={styles.buttonText}>Submit & Print</Text>
                    </TouchableOpacity>
                    </View>
                
                </>
            );
        } else if (activeTab === 'Service') {
            return (
                <>
                
                    {/* <View style={styles.dateTimeContainer}>
                        <Text style={styles.dateText}>{moment().format('Do MMMM YYYY')}</Text>
                        <Text style={styles.datesText}>{moment().format('h:mm a')}</Text>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Text style={{marginLeft:12}}>Name</Text>
                        <Text style={{marginRight:120}}> Phone</Text>
                    </View> */}
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
                        placeholder="Discount"
                        keyboardType="numeric"
                        value={discount}
                        onChangeText={setDiscount}
                    />
                    {product && (
                        <Text style={styles.priceText}>Final Price: {price - (discount * price) / 100}</Text>
                    )}
      {product&&<DropDownPicker
        open={open}
        value={paymentSelect}
        items={items}
        setOpen={setOpen}
        setValue={setPaymentSelect}
        setItems={setItems}
        placeholder="Select Payment Method"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />}

      {/* Conditional Rendering for QR Code when "UPI" is selected */}
      {paymentSelect === 'upi' && (
        <View>
          <Text style={styles.qrText}>Scan this QR code to pay via UPI:</Text>
          <Image
            source={{uri:"https://imgs.search.brave.com/mNOSUEuvzvmR_GB5ndP8qE_R1mFIUliIU4pn-oDjIEk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jMS5p/bWcycXIuY29tL2lt/YWdlcy9zaW1wbGVf/cXJjb2RlLnBuZz94/LW9zcy1wcm9jZXNz/PWltYWdlL3F1YWxp/dHksUV84MA"}}  // Replace with your QR code image path
            style={tw`h-40 w-40 mx-24`}
          />
        </View>
      )}

                    <TouchableOpacity style={styles.button} onPress={addApi}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                
                </>
            );
        } else if (activeTab === 'Marketing') {
            return (
                <>
                {/* <Text style={tw`font-bold text-black ml-6`}>Hi</Text>
                <View style={styles.dateTimeContainer}>
                        <Text style={styles.dateText}>{moment().format('Do MMMM YYYY')}</Text>
                        <Text style={styles.datesText}>{moment().format('h:mm a')}</Text>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Text style={{marginLeft:12}}>Name</Text>
                        <Text style={{marginRight:120}}> Phone</Text>
                    </View> */}
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
                    <TextInput
                        style={styles.input}
                        placeholder="Shop Name"
                        value={shop}
                        onChangeText={setShop}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Pincode"
                        value={pin}
                        maxLength={6}
                        keyboardType='phone-pad'
                        onChangeText={(text)=>{
                            setPin(text);
                            if(text.length === 6){
                                fetchState(text);
                            }
                    }}/>
                    <View style={styles.dateTimeContainer}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="City"
                        value={city}
                        onChangeText={setCity}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="State"
                        value={state}
                        onChangeText={setState}
                    />
                    </View>

                    {/* <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Machine"
                        value={city}
                        onChangeText={setCity}
                    /> */}

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
                    {product&&<DropDownPicker
                        open={open}
                        value={paymentSelect}
                        items={items}
                        setOpen={setOpen}
                        setValue={setPaymentSelect}
                        setItems={setItems}
                        placeholder="Select Payment Method"
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />}
                    <TouchableOpacity style={styles.button} onPress={addMarketingEntry}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    </>
            );
        }
    };

        return (
            <>
                <View
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                    horizontal={false}
                >
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
                </View>
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
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#ddd',
        marginHorizontal: 5,
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
