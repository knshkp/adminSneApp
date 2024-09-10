import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity,FlatList } from 'react-native';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
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
    const addApi = async () => {
        const employeeDetails=await AsyncStorage.getItem('employeeDetails')
        const finalEmployee=JSON.parse(employeeDetails)
        console.log(finalEmployee[0].phone_number)
        const body = {
          seller_phone: finalEmployee[0].phone_number,
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
        console.log(body)
      
        try {
          const response = await axios.post('http://20.197.21.104/employeeServices/addEmployeeService', body, {
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

    useEffect(() => {
        
        const fetchVendorData = async () => {
            try {
                const response = await fetch('http://20.197.21.104/employee/getEmployee?phone=8104450592');
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
                const response = await fetch('http://20.197.21.104:3000/shop/get_product');
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

        fetchVendorData();
        fetchCategories();
    }, []);
    useEffect(()=>{
        const updateEntry=()=>{
            setCategory('');
            setAddress('');
            setCustomerName('');
            setShop('');
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
                    <View style={styles.dateTimeContainer}>
                        <Text style={styles.dateText}>{moment().format('Do MMMM YYYY')}</Text>
                        <Text style={styles.datesText}>{moment().format('h:mm a')}</Text>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Text style={{marginLeft:12}}>Name</Text>
                        <Text style={{marginRight:120}}> Phone</Text>
                    </View>
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
                        open={open}
                        value={category}
                        items={categoryItems}
                        setOpen={setOpen}
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
                    <TextInput
                        style={styles.input}
                        placeholder="Payment Method"
                        value={paymentSelect}
                        onChangeText={setPaymentSelect}
                    />
                    <TouchableOpacity style={styles.button} onPress={addApi}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                
                </>
            );
        } else if (activeTab === 'Service') {
            return (
                <>
                    <View style={styles.dateTimeContainer}>
                        <Text style={styles.dateText}>{moment().format('Do MMMM YYYY')}</Text>
                        <Text style={styles.datesText}>{moment().format('h:mm a')}</Text>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Text style={{marginLeft:12}}>Name</Text>
                        <Text style={{marginRight:120}}> Phone</Text>
                    </View>
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
                        open={open}
                        value={category}
                        items={categoryItems}
                        setOpen={setOpen}
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

      {/* Conditional Rendering for QR Code when "UPI" is selected */}
      {paymentSelect === 'upi' && (
        <View style={styles.qrContainer}>
          <Text style={styles.qrText}>Scan this QR code to pay via UPI:</Text>
          {/* <Image
            source={require('./path_to_your_qr_image.png')}  // Replace with your QR code image path
            style={styles.qrImage}
          /> */}
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
                <View style={styles.dateTimeContainer}>
                        <Text style={styles.dateText}>{moment().format('Do MMMM YYYY')}</Text>
                        <Text style={styles.datesText}>{moment().format('h:mm a')}</Text>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Text style={{marginLeft:12}}>Name</Text>
                        <Text style={{marginRight:120}}> Phone</Text>
                    </View>
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
                    <TextInput
                        style={styles.input}
                        placeholder="Pincode"
                        value={pin}
                        maxLength={6}
                        keyboardType='phone-pad'
                        onChangeText={setPin}
                    />
                    <TextInput
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
                    />
                    <DropDownPicker
                        open={open}
                        value={category}
                        items={categoryItems}
                        setOpen={setOpen}
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
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    </>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
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
            <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.scrollContainer}>
                {renderContent()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
        marginBottom: 20,
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
        padding: 15,
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
        padding: 15,
        marginTop: 5,
        marginHorizontal:10,
        marginBottom: 10,
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
        marginTop: 20,
        marginHorizontal:10,
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
    namePhoneContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default EmployeeHome;