import React, { useState } from "react";
import {
  View,Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const ProductDetail = ({ navigation }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: "1",
    name: "Nike Blazer Mid 1",
    price: 1110000,
    salePrice: 999000,
    soldCount: 1500,
    image: require("../../assets/images/1.png"),
    description: "",
    sizes: ["37","38","39", "40", "41", "42"],
  };

  const relatedProducts = [
    {
      id: "2",
      name: "Pegasus 1",
      price: 1400000,
      image: require("../../assets/images/loai2_1.jpg"),
    },
    {
      id: "3",
      name: "Nike Blazer Low",
      price: 1000000,
      image: require("../../assets/images/loai2_2.jpg"),
    },
    {
      id: "4",
      name: "Nike Cotez 4 Shoes",
      price: 1150000,
      image: require("../../assets/images/loai2_3.jpg"),
    },
  ];

  const renderRelatedProduct = ({ item }) => (
    <View style={styles.relatedProductItem}>
      <Image source={item.image} style={styles.relatedProductImage} />
      <Text style={styles.relatedProductName}>{item.name}</Text>
      <Text style={styles.relatedProductPrice}>
        {item.price.toLocaleString("vi-VN")} ₫
      </Text>
    </View>
  );

  const increaseQuantity = () =>
    setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () =>
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <Image
              source={product.image}
              style={styles.productImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.priceContainer}>
              <View style={styles.priceWrapper}>
                 <Text
                  style={[
                    styles.price,
                    product.salePrice && styles.strikethrough,
                  ]}
                >
                  {product.price.toLocaleString("vi-VN")} ₫
                </Text>
                {product.salePrice && (
                  <Text style={styles.salePrice}>
                    {product.salePrice.toLocaleString("vi-VN")} ₫
                  </Text>
                )}
              </View>
              <Text style={styles.soldCount}>Đã bán: {product.soldCount}</Text>
            </View>
<Text style={styles.sectionTitle}>Size:</Text>
            <View style={styles.sizeContainer}>
              {product.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSizeButton,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeButtonText,
                      selectedSize === size && styles.selectedSizeButtonText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Số lượng:</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={decreaseQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={increaseQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Mô tả sản phẩm:  Giày Jordan 1 được trang bị bộ đệm trứ danh của nhà Nike là đệm “Air” ở gót chân tạo sự thoải mái. Mũi giày đầy đặn, cứng dáng. Với form dáng lên vô cùng chuẩn giúp bảo vệ các đầu ngón chân của bạn một cách tốt nhất. Phần cổ giày được thiết kế vô cùng đơn giản, vừa vặn giúp bạn di chuyển dễ dàng. Đế giày của thương hiệu này được làm bằng chất liệu cao su, chống trơn trượt vô cùng tốt.</Text>
            <Text style={styles.description}>{product.description}</Text>

            <Text style={styles.sectionTitle}>Sản phẩm liên quan:</Text>
            <FlatList
              data={relatedProducts}
              renderItem={renderRelatedProduct}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cartButton}>
                <Text style={styles.cartButtonText}>Thêm vào giỏ hàng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Mua ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    width: width,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: width * 0.8,
    height: "100%",
  },
  infoContainer: {
    padding: 15,
  },
  productName: {
    fontSize: 15,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 15,
    color: "#888",
  },
  strikethrough: {
    textDecorationLine: "line-through",
    marginRight: 10,
  },
  salePrice: {
    fontSize: 15,
    color: "#FF6347",
  },
  sectionTitle: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 6,
  },
  sizeContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginRight: 10,
  },
  selectedSizeButton: {
    borderColor: "#FF6600",
  },
  sizeButtonText: {
    fontSize: 10,
  },
  selectedSizeButtonText: {
    color: "#FF6600",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantityButton: {
    width: 23,
    height: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "black",
    fontSize: 15,
  },
  quantityText: {
    fontSize: 15,
    marginHorizontal: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 10,
  },
  relatedProductItem: {
    marginRight: 15,
    width: 100,
  },
  relatedProductImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
  },
  relatedProductName: {
    fontSize: 15,
    marginTop: 5,
  },
  relatedProductPrice: {
    fontSize: 14,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cartButton: {
    backgroundColor: "#FFCC99", // Light orange color for the cart button
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
    borderWidth: 2, // Border thickness
    borderColor: "#FF6600", // Border color
  },

  cartButtonText: {
    color: "#FF6600",
    fontSize: 15,
  },
  buyButton: {
    backgroundColor: "#FF6600",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between", // Add this line
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: "center",
  }, // Add this new style
  soldCount: {
    fontSize: 12,
    color: "#888",
  }, // Add this new style
});

export default ProductDetail;