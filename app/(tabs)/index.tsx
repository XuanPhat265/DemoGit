import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import thư viện icon
import axios from 'axios'; // Import Axios
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  // Dữ liệu danh mục
  const categoryList = [
    { id: '1', name: 'All', value: 'all' },
    { id: '2', name: 'Men\'s Clothing', value: 'men\'s clothing' },
    { id: '3', name: 'Women\'s Clothing', value: 'women\'s clothing' },
    { id: '4', name: 'Jewelery', value: 'jewelery' },
    { id: '5', name: 'Electronics', value: 'electronics' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [productList, setProductList] = useState([]); // Dữ liệu sản phẩm từ API
  const navigation = useNavigation();  

  // Sử dụng useEffect để gọi API
  useEffect(() => {
    // Gọi API và cập nhật danh sách sản phẩm
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from API', error);
      });
  }, []);

  const renderProductItem = ({ item }) => {
    if (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'all' || item.category === selectedCategory)
    ) {
      return (
        <TouchableOpacity
          style={styles.productItem}
          onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
        </TouchableOpacity>

        
      );
    }
    return null;
  };
  

  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          selectedCategory === item.value && styles.selectedCategory,
        ]}
        onPress={() => setSelectedCategory(item.value)}
      >
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>XuanPhat Shop</Text>
        <TouchableOpacity>
          <Icon name="" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Banner and Search */}
      <ScrollView>
        <Image
          source={{ uri: 'https://www.snkrempire.com/wp-content/uploads/2020/03/NIKE_BANNER.png ' }}
          style={styles.banner}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm ..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        {/* Danh mục */}
        <FlatList
          data={categoryList}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />

        {/* Danh sách sản phẩm */}
        <Text style={styles.title}>Sản Phẩm Nổi Bật</Text>
        <FlatList
          data={productList}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()} // Thay đổi keyExtractor vì id từ API là số
          numColumns={3} // Thêm thuộc tính numColumns để chia thành 2 cột
        />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Liên Hệ: 0345.38.39.79</Text>
          <Text style={styles.footerText}>Thương hiệu uy tín. Chất lượng số 1 Việt Nam</Text>
          <View style={styles.footerIcons}>
            <TouchableOpacity>
              <Icon name="logo-facebook" size={25} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="logo-instagram" size={25} color="#C13584" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="logo-twitter" size={25} color="#1DA1F2" />
            </TouchableOpacity>

            
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  headerTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  banner: {
    width: '100%',
    height: 270,
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#FFCC66',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  categoryList: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#FFCC66',
  },
  categoryText: {
    color: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginHorizontal: 20,
    color: '#333333',
  },
  // productItem: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 15,
  //   backgroundColor: '#F5F5F5',
  //   marginBottom: 30,
  //   marginHorizontal: 40,
  //   borderRadius: 5,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 5,
  // },
  // productImage: {
  //   width: 50,
  //   height: 50,
  //   marginRight: 15,
  //   borderRadius: 5,
  // },
  // productInfo: {
  //   flex: 1,
  // },

  productItem: {
    flexDirection: 'column', // Sắp xếp theo cột
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F5F5F5',
    margin: 10, // Điều chỉnh khoảng cách giữa các sản phẩm
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  productImage: {
    width: 120,
    height: 120, // Tăng kích thước hình ảnh để hiển thị rõ hơn
    marginBottom: 10,
    borderRadius: 5,
  },
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap', // Cho phép tự động xuống hàng
    maxWidth: 120, // Giới hạn chiều rộng để điều chỉnh xuống hàng cho hợp lý
  },
  productPrice: {
    fontSize: 16,
    color: 'red',
  },

  footer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 10,
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777777',
  },
});

export default HomePage;
