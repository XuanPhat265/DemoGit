import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";
import Toast from "react-native-toast-message";

const CART_KEY = "cartItems";

const Cart = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchCartData();
      return () => {};
    }, [])
  );

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const storedCart = await AsyncStorage.getItem(CART_KEY);
      const cartData = storedCart ? JSON.parse(storedCart) : [];

      const productsResponse = await fetch("https://fakestoreapi.com/products");
      const productsData = await productsResponse.json();

      const productsMap = productsData.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {});

      setProducts(productsMap);
      setCartItems(
        cartData.map((item) => ({
          ...item,
          product: productsMap[item.productId],
        }))
      );
      setSelectedItems([]);
    } catch (error) {
      console.error("Error fetching data:", error);
      Toast.show({
        text1: "Error loading data",
        text2: "Please try again later",
        type: "error",
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      if (quantity < 1) return;

      const updatedCart = cartItems.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      );

      await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
      setCartItems(updatedCart);

      Toast.show({
        text1: "Thêm số lượng sản phẩm thành công!",
        type: "success",
        position: "bottom",
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      Toast.show({
        text1: "Error updating quantity",
        type: "error",
        position: "bottom",
      });
    }
  };

  const removeItem = async (id) => {
    try {
      const updatedCart = cartItems.filter((item) => item.product.id !== id);
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));

      Toast.show({
        text1: "Item removed from cart!",
        type: "success",
        position: "bottom",
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error("Error removing item:", error);
      Toast.show({
        text1: "Error removing item",
        type: "error",
        position: "bottom",
      });
    }
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.product.id))
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6600" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.cartTitle}>Giỏ hàng</Text>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Trống.</Text>
          <TouchableOpacity
            style={styles.continueShopping}
            onPress={() => navigation.navigate("index")}
          >
            <Text style={styles.continueShoppingText}>Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cartContent}>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <TouchableOpacity
                  onPress={() => toggleSelectItem(item.product.id)}
                  style={styles.checkboxContainer}
                >
                  <View
                    style={[
                      styles.customCheckbox,
                      selectedItems.includes(item.product.id) &&
                        styles.checked,
                    ]}
                  >
                    {selectedItems.includes(item.product.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>

                <Image
                  source={{ uri: item.product.image }}
                  style={styles.productImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.productName}>{item.product.title}</Text>
                  <Text style={styles.productPrice}>
                    ${item.product.price.toFixed(2)}
                  </Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => removeItem(item.product.id)}
                      style={styles.removeButton}
                    >
                      <Text style={styles.removeButtonText}>Xóa </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.product.id.toString()}
          />

          {selectedItems.length > 0 && (
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>
                Total ({selectedItems.length} items): ${calculateTotal()}
              </Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => {
                  const selectedProducts = cartItems.filter((item) =>
                    selectedItems.includes(item.product.id)
                  );
                  navigation.navigate("Payment", {
                    items: selectedProducts,
                  });
                }}
              >
                <Text style={styles.checkoutButtonText}>Thanh toán</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 16,
    color: "#888",
  },
  continueShopping: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  continueShoppingText: {
    color: "#FFF",
    fontWeight: "600",
  },
  cartContent: {
    flex: 1,
    padding: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  customCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ff6600",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#ff6600",
  },
  checkmark: {
    color: "#FFF",
    fontWeight: "bold",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "#ff6600",
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontWeight: "600",
    color: "#ff6600",
  },
  quantityText: {
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 10,
  },
  removeButtonText: {
    color: "#FF3B30",
  },
  totalContainer: {
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "600",
  },
  checkoutButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#ff6600",
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default Cart;
