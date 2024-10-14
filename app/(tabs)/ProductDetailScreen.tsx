import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const product = {
    id: '1',
    name: 'Jordan Two Low',
    price: 1300000,
    salePrice: 699000,
    images: [
      require('../../assets/images/loai1_1.jpg'),
      
    ],
    description:
      'Giày Jordan 1 được trang bị bộ đệm trứ danh của nhà Nike là đệm “Air” ở gót chân, ngoài ra thì nó còn có bộ đệm cổ chân dày và đủ để hạn chế chấn thương khi chơi bóng.',
    sizes: ['37', '38','39', '40','41', '42'],
    // features: ['Gót chân êm ái', 'Tăng cường độ bám', 'Tạo sự thoải mái'],
  };

  // const relatedProducts = [
  //   {
  //     id: '2',
  //     name: 'Nike Blazer Mid 1',
  //     price: 349000,
  //     image: require('../../assets/images/loai1_1.jpg'),
  //   },
  //   {
  //     id: '3',
  //     name: 'Nike Cotez 1 Shoes',
  //     price: 399000,
  //     image: require('../../assets/images/loai1_2.jpg'),
  //   },
  //   {
  //     id: '4',
  //     name: 'Pegasus 1',
  //     price: 599000,
  //     image: require('../../assets/images/loai1_3.jpg'),
  //   },
  // ];

  const renderProductImage = ({ item, index }) => (
    <Image source={item} style={styles.productImage} />
  );

  const renderImageIndicator = () => (
    <View style={styles.indicatorContainer}>
      {product.images.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.indicator,
              { opacity, transform: [{ scale }] },
            ]}
          />
        );
      })}
    </View>
  );

  const renderRelatedProduct = ({ item }) => (
    <TouchableOpacity style={styles.relatedProductItem}>
<Image source={item.image} style={styles.relatedProductImage} />
      <Text style={styles.relatedProductName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.relatedProductPrice}>
        {item.price.toLocaleString('vi-VN')} ₫
      </Text>
    </TouchableOpacity>
  );

  const increaseQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <FlatList
              data={product.images}
              renderItem={renderProductImage}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
            />
            {renderImageIndicator()}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={[styles.price, product.salePrice && styles.strikethrough]}>
                {product.price.toLocaleString('vi-VN')} ₫
              </Text>
              {product.salePrice && (
                <Text style={styles.salePrice}>
                  {product.salePrice.toLocaleString('vi-VN')} ₫
                </Text>
              )}
            </View>

       

            <Text style={styles.sectionTitle}>Size:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sizeContainer}>
              {product.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeButton, selectedSize === size && styles.selectedSizeButton]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.selectedSizeButtonText, selectedSize === size && styles.selectedSizeButtonText]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

<Text style={styles.sectionTitle}>Số lượng:</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                <Ionicons name="remove" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                <Ionicons name="add" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Mô tả sản phẩm:</Text>
            <Text style={styles.description}>{product.description}</Text>

            {/* <Text style={styles.sectionTitle}>Sản phẩm liên quan:</Text>
            <FlatList
              data={relatedProducts}
              renderItem={renderRelatedProduct}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            /> */}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cartButton}>
                <Ionicons name="cart-outline" size={24} color="#FF6600" />
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
    backgroundColor: '#f9f9f9', // Màu nền nhẹ nhàng hơn
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 220, // Giữ kích thước phù hợp
    width: '100%',
  },
  productImage: {
    width: width / 1, // Điều chỉnh để hình ảnh trông cân đối hơn
    height: 160,
    resizeMode: 'cover',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700', // Vàng nhạt cho cảm giác thân thiện
    margin: 4,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333', // Màu tối hơn, dễ đọc
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 18,
    color: '#888',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    marginRight: 10,
color: '#A9A9A9', // Màu xám nhạt cho giá gạch ngang
  },
  salePrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6347', // Màu cam đỏ, nổi bật nhưng vẫn hài hòa
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Màu tối đồng bộ
    marginTop: 20,
    marginBottom: 10,
  },
  featuresContainer: {
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555', // Màu xám trung tính cho text chi tiết
  },
  sizeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#F0F0F0', // Màu nền nhẹ nhàng cho nút chọn kích cỡ
  },
  selectedSizeButton: {
    borderColor: '#FF6347', // Cam đỏ, đồng bộ với giá sale
    backgroundColor: '#FFE4E1', // Nền nhạt màu hồng phấn
  },
  selectedSizeButtonText: {
    color: '#FF6347', // Màu chữ đồng bộ với nút kích cỡ
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#F0F0F0', // Nền nhạt hài hòa
  },
  quantityText: {
    fontSize: 18,
    paddingHorizontal: 20,
    color: '#333', // Màu chữ tối đồng bộ
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#555', // Màu xám dễ chịu
  },
  relatedProductItem: {
    marginRight: 15,
    width: 140,
  },
  relatedProductImage: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  relatedProductName: {
    fontSize: 14,
    marginTop: 5,
    height: 40,
    color: '#333', // Màu chữ tối
  },
  relatedProductPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6347', // Màu cam đỏ, tạo sự nổi bật
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  cartButton: {
    backgroundColor: '#FFE4E1', // Màu hồng phấn dịu dàng cho nút thêm vào giỏ hàng
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  cartButtonText: {
    color: '#FF6347', // Đồng bộ màu cam đỏ cho chữ
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buyButton: {
    backgroundColor: '#FF6347', // Nút mua ngay màu cam đỏ để nổi bật
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  buyButtonText: {
    color: '#fff', // Chữ trắng nổi bật trên nền cam
    fontSize: 16,
fontWeight: 'bold',
  },
});

export default ProductDetail;