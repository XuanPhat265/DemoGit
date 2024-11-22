import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const CheckoutPage: React.FC = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=3')
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProducts(data);
        const totalAmount = data.reduce((acc, product) => acc + product.price, 0);
        setTotal(totalAmount);
      })
      .catch((error) => console.error('Lỗi khi gọi API:', error));
  }, []);

  const handleConfirmOrder = () => {
    alert("Thanh toán thành công!"); // Show alert
    navigation.navigate('index'); // Navigate to Home
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Thông tin</Text>
        <View style={styles.inputGroup}>
          <Text>Tên khách hàng</Text>
          <TextInput placeholder="Nhập tên" style={styles.input} />
        </View>
        <View style={styles.inputGroup}>
          <Text>Địa chỉ</Text>
          <TextInput placeholder="Nhập địa chỉ" style={styles.input} />
        </View>
        <View style={styles.inputGroup}>
          <Text>Số điện thoại</Text>
          <TextInput placeholder="Nhập số điện thoại" style={styles.input} keyboardType="phone-pad" />
        </View>

        <Text style={styles.sectionTitle}>Sản phẩm</Text>
        <View style={styles.orderSummary}>
          {products.map((product) => (
            <View key={product.id} style={styles.orderItem}>
              <Text>{product.title}</Text>
              <Text>{product.price} $</Text>
            </View>
          ))}
          <View style={{ ...styles.orderItem, ...styles.totalPrice }}>
            <Text style={{ fontWeight: 'bold' }}>Tổng cộng:</Text>
            <Text>{total.toFixed(2)} $</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        <View style={styles.paymentMethods}>
          {['Credit card', 'Bank transfer', 'Payment upon delivery (COD)'].map((method) => (
            <TouchableOpacity
              key={method}
              style={styles.paymentMethod}
              onPress={() => handlePaymentMethodSelect(method)}
            >
              <View style={styles.radioButton}>
                {selectedPaymentMethod === method && <View style={styles.selectedRadio} />}
              </View>
              <Text style={styles.paymentText}>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Thanh toán" color="#ff6600" onPress={handleConfirmOrder} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'F5F5F5',
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(200, 200, 200, 0.2)', // Slightly transparent background
  },
  orderSummary: {
    marginTop: 20,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentMethods: {
    marginTop: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF91A4',
  },
  paymentText: {
    color: '#333',
  },
});

export default CheckoutPage;
