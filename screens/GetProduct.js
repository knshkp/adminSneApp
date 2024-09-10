import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker
import { Picker } from '@react-native-picker/picker'; // Import Picker for Dropdown

const AdminProductScreen = () => {
  const [categories, setCategories] = useState([]); // State to store categories
  const [modalVisible, setModalVisible] = useState(false);
  const [productDetailModalVisible, setProductDetailModalVisible] = useState(false); // State for product details modal
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product details
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    dealer_price: '',
    discount: '',
    category_id: '662090170ce92b50f6ce80ea', // State to store selected category ID
    description: '',
    is_dealerProducts: 0,
    product_count: '',
  });
  const [productImage, setProductImage] = useState(null); // State to store the selected image

  useEffect(() => {
    fetchCategories(); // Fetch categories when component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://20.197.21.104/shop/get_product');
      if (response.data.data.success) {
        setCategories(response.data.data.data); // Update state based on the API response structure
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://20.197.21.104/shop/get_category');
      setCategories(response.data); // Set categories from API response
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
    console.log(`>>>>>>formData>>>>`, formData);

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
          setProductImage(assets[0]); // Set the selected image
        }
      }
    });
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setProductDetailModalVisible(true);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => handleProductPress(item)}>
      <Image source={{ uri: item.productImage }} style={styles.productImage} />
      <Text style={styles.productName}>{item.product_name}</Text>
      <Text style={styles.productPrice}>₹{item.product_price}</Text>
      <Text style={styles.productDiscount}>Discount: {item.discount}%</Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryName}>{item.category}</Text>
      <Image source={{ uri: item.bannerImage }} style={styles.bannerImage} />
      <FlatList
        data={item.product}
        renderItem={renderProduct}
        keyExtractor={(product) => product.product_name}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(category) => category.category}
      />

      {/* Add Product Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>

      {/* Add Product Modal */}
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
    </View>
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
