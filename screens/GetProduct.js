import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet,Modal,TextInput, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import tw from 'twrnc';
import { Picker } from '@react-native-picker/picker';

const AdminProductScreen = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productDetailModalVisible, setProductDetailModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    dealer_price: '',
    discount: '',
    category_id: '662090170ce92b50f6ce80ea',
    description: '',
    is_dealerProducts: 0,
    product_count: '',
  });
  const [productImage, setProductImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter((product) => product.category === selectedCategory);
      console.log(filtered[0].product)
      setFilteredProducts(filtered[0].product);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://sangramindustry-i5ws.onrender.com/shop/get_product');
      setProducts(response.data.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://sangramindustry-i5ws.onrender.com/shop/get_category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const handleAddProduct = async () => {
    console.log(`>>>>>>>>>>>>`, newProduct);
    console.log(`>>>>>>>>`, productImage);

    // Validate input data before making the API call
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.dealer_price ||
      !newProduct.discount ||
      !newProduct.category_id ||
      !newProduct.description ||
      !newProduct.product_count ||
      !productImage // Ensure an image is selected
    ) {
      Alert.alert('Error', 'Please fill in all fields and select an image.');
      return;
    }

    // Prepare FormData for the API request
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('dealer_price', newProduct.dealer_price);
    formData.append('discount', newProduct.discount);
    formData.append('category_id', newProduct.category_id); // Use selected category ID
    formData.append('description', newProduct.description);
    formData.append('is_dealerProducts', newProduct.is_dealerProducts);
    formData.append('product_count', newProduct.product_count);

    // Append image file
    formData.append('productImage', {
      uri: productImage.uri,
      type: productImage.type,
      name: productImage.fileName || 'image.jpg'
    });

    try {
      const response = await axios.post('http://20.197.21.104/shop/add_product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message === 'added product successfully') {
        Alert.alert('Success', 'Product added successfully!');
        setModalVisible(false); // Close the modal after adding the product
        fetchProducts(); // Refresh the product list
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product. Please try again.');
    }
  };


  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        const { assets } = response;
        if (assets && assets.length > 0) {
          setProductImage(assets[0]);
        }
      }
    });
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setProductDetailModalVisible(true);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={tw`m-2 h-60 p-4 bg-white items-center rounded-lg w-38` } onPress={() => handleProductPress(item)}>
      <Image source={{ uri: item.productImage }} style={tw`h-20 w-20 `} />
      <Text style={tw`font-bold text-black mt-8`}>{item.product_name}</Text>
      <Text style={styles.productPrice}>Price: ₹{item.product_price}</Text>
      <Text style={styles.productDiscount}>Discount: {item.discount}%</Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        tw`padding-10 px-2 py-2 border-2 rounded-full border-double h-24 mt-6 mr-2 `,
        selectedCategory === item.category && tw`padding-10 px-2 py-2 border-2 rounded-full border-double h-24 mt-6 mr-2 border-blue-500`
      ]}
      onPress={() => setSelectedCategory(item.category)}
    >
      <Image source={{ uri: item.categoryImage }} style={tw`h-20 w-20 rounded-full`} />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={tw`flex-1 justify-center item-center`}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(category) => category.category}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(product) => product.product_name}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={tw`bg-blue-500 mb-10 mx-5 py-3 rounded-lg`}>
        <Text style={tw`text-white font-bold text-center`}>Add Product</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Product</Text>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={newProduct.price}
              onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Dealer Price"
              keyboardType="numeric"
              value={newProduct.dealer_price}
              onChangeText={(text) => setNewProduct({ ...newProduct, dealer_price: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Discount (%)"
              keyboardType="numeric"
              value={newProduct.discount}
              onChangeText={(text) => setNewProduct({ ...newProduct, discount: text })}
            />

            {/* Category Picker */}
            <Picker
              selectedValue={newProduct.category_id} // Ensure this is correctly linked to the state
              style={styles.picker}
              onValueChange={(itemValue) => {
                setNewProduct((prevProduct) => ({ ...prevProduct, category_id: itemValue })); // Correctly update the state
              }}
            >
              <Picker.Item label="Select Category" value="" />
              {categories.map((category) => (
                <Picker.Item key={category._id} label={category.category} value={category._id} />
              ))}
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newProduct.description}
              onChangeText={(text) => setNewProduct({ ...newProduct, description: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Product Count"
              keyboardType="numeric"
              value={newProduct.product_count}
              onChangeText={(text) => setNewProduct({ ...newProduct, product_count: text })}
            />

            {/* Image Picker */}
            <TouchableOpacity style={styles.selectImageButton} onPress={selectImage}>
              <Text style={styles.selectImageButtonText}>
                {productImage ? 'Image Selected' : 'Select Image'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleAddProduct}>
              <Text style={styles.submitButtonText}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Product Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={productDetailModalVisible}
        onRequestClose={() => setProductDetailModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Image source={{ uri: selectedProduct.productImage }} style={styles.detailImage} />
                <Text style={styles.modalTitle}>{selectedProduct.product_name}</Text>
                <Text style={styles.productDetailText}>Price: ₹{selectedProduct.product_price}</Text>
                <Text style={styles.productDetailText}>Discount: {selectedProduct.discount}%</Text>
                <Text style={styles.productDetailText}>{selectedProduct.description}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setProductDetailModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#333',
  },
  productDiscount: {
    fontSize: 14,
    color: '#d9534f',
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007BFF',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  picker: {
    marginBottom: 15,
  },
  selectImageButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  selectImageButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 15,
  },
  productDetailText: {
    fontSize: 18,
    marginVertical: 8,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminProductScreen;
