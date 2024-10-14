  import React, { useState } from 'react';
  import { View, Text, FlatList, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
  import Icon from 'react-native-vector-icons/Ionicons'; // Import thư viện icon



  const HomePage = ({  }) => {
    // Dữ liệu sản phẩm và danh mục
    const productList = [
      { id: '10', name: 'Nike Blazer Mid 1', category: 'blazer', price: '1.110.000 đ', image: 'https://themixdalat.vn/wp-content/uploads/2023/02/giay-nike-blazer-low-vintage.jpg' },
      { id: '11', name: 'Nike Blazer Low', category: 'blazer', price: '1.000.000 đ', image: 'https://giaysneaker.store/media/catalog/product/cache/47d66d3609f727ab73c995561c27d006/n/i/nike-sb-zoom-blazer-mid-black-864349-007-0.png' },
      { id: '12', name: 'Nike Blazer Jumpo', category: 'blazer', price: '1.950.000 đ', image: 'https://product.hstatic.net/200000384421/product/dz2544_100.png_5456e948141942f5a0c2ee71deb502d2_grande.png' },
      { id: '13', name: 'Nike Cotez 1 shoes', category: 'cotez', price: '1.850.000 đ', image: 'https://product.hstatic.net/1000243581/product/hinh_web__3__8f8d65bc4c6540f5946a777a3936e674_1024x1024.png' },
      { id: '14', name: 'Nike Cotez 2 shoes', category: 'cotez', price: '1.450.000 đ', image: 'https://fsport247.com/wp-content/uploads/2021/04/giay-nike-cortez-trang-do-sf-4.jpeg' },
      { id: '15', name: 'Nike Cotez 3 shoes', category: 'cotez', price: '1.550.000 đ', image: 'https://cdn.vuahanghieu.com/unsafe/0x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/news/content/2020/12/giay-nike-cherry-5-jpg-1606993432-03122020180352.jpg' },
      { id: '16', name: 'Nike Cotez 4 shoes', category: 'cotez', price: '1.150.000 đ', image: 'http://product.hstatic.net/1000379507/product/1_7437c17152ff44469b908077d9443bc4_grande.jpg' },
      { id: '1', name: 'Jordan One Low', category: 'jordan', price: '1.150.000 đ', image: 'https://tse4.mm.bing.net/th?id=OIP.2cRpgrWxa3ADIha3oCzs4wHaHa&pid=Api&P=0&h=180' },
      { id: '2', name: 'Jordan Nike Air', category: 'jordan', price: '1.300.000 đ', image: 'https://mssstore.vn/storage/san-pham/nike/434284799-946899420771905-862224-800x800.jpg' },
      { id: '3', name: 'Jordan Two low', category: 'jordan', price: '1.300.000 đ', image: 'https://cf.shopee.vn/file/b0518efee373201bed271e21505a8749' },
      { id: '4', name: 'Jordan Nike 1 Low Limited', category: 'jordan', price: '1.250.000 đ', image: 'https://www.acfc.com.vn/acfc_wp/wp-content/uploads/2021/07/Nike-Jordan-1-Mid-Metallic-Red.jpg' },
      { id: '5', name: 'Pegasus 1', category: 'pegasus', price: '1.400.000 đ', image: 'https://giaysneaker.store/media/catalog/product/cache/47d66d3609f727ab73c995561c27d006/c/b/cbceabfecafddfa_primary.jpg' },
      { id: '6', name: 'Pegasus 2', category: 'pegasus', price: '1.050.000 đ', image: 'https://product.hstatic.net/200000174405/product/3_ba9dc09451b543e098663461432cf8f7_master.jpg' },
      { id: '7', name: 'Pegasus 3', category: 'pegasus', price: '1.350.000 đ', image: 'https://vietthethao.com/public/cuploads/images/Gi%C3%A0y%20Ch%E1%BA%A1y%20B%E1%BB%99%20Nike%20Pegasus%2039%20DZ4776-343%20(4).jpg' },
      { id: '8', name: 'Pegasus 4', category: 'pegasus', price: '1.320.000 đ', image: 'https://www.jordan1.vn/wp-content/uploads/2023/10/s-l1200-18-1.png' },
      { id: '9', name: 'Nike Blazer Vape Primeum', category: 'blazer', price: '1.120.000 đ', image: 'https://themixdalat.vn/wp-content/uploads/2023/02/giay-nike-blazer-low-77-white-rose-whisper.jpg' },
      
    ];


    const categoryList = [
      { id: '1', name: 'All', value: 'all' },
      { id: '2', name: 'Jordan', value: 'jordan' },
      { id: '3', name: 'Pegasus', value: 'pegasus' },
      { id: '4', name: 'Blazer', value: 'blazer' },
      { id: '5', name: 'Cotez', value: 'cotez' },
    ];

    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Hàm render từng sản phẩm
    const renderProductItem = ({ item }) => {
      // Kiểm tra nếu tên sản phẩm chứa từ khóa tìm kiếm và thuộc danh mục
      if (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === 'all' || item.category === selectedCategory)
      ) {
        return (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigation.navigate('ProductDetail', { product: item })} // Chuyển sang trang chi tiết sản phẩm
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
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
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>XuanPhat Shop</Text>
          <TouchableOpacity>
            <Icon name="cart" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Banner and Search */}
        <ScrollView>
          <Image
            source={{ uri: 'https://wallpapercave.com/wp/wp8247451.jpg' }}
            style={styles.banner}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
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
            keyExtractor={(item) => item.id}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Liên Hệ: 0345.38.39.79</Text>
            <Text style={styles.footerText}>Thương hiệu Giày Nike. Chất lượng số 1 Việt Nam</Text>
            <View style={styles.footerIcons}>
              <TouchableOpacity>
                <Icon name="logo-facebook" size={30} color="#3b5998" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="logo-instagram" size={30} color="#C13584" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="logo-twitter" size={30} color="#1DA1F2" />
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
        backgroundColor: '#F8F8FF', // Đặt màu nền
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'black', // Màu nền của header
    },
    headerTitle: {
        fontSize: 20,
        color: '#ffffff', // Màu chữ tiêu đề
        fontWeight: 'bold',
    },
    banner: {
        width: '100%',
        height: 400,
        marginBottom: 20,
        borderRadius: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#1E90FF', // Màu viền của ô tìm kiếm
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
        backgroundColor: '#F5F5F5', // Màu nền cho danh mục
        borderRadius: 5,
        marginRight: 10,
    },
    selectedCategory: {
        backgroundColor: '#CCFFFF', // Màu nền cho danh mục được chọn
    },
    categoryText: {
        color: '#000000', // Màu chữ danh mục
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginHorizontal: 20,
        color: '#333333', // Màu chữ tiêu đề sản phẩm
    },
    productItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: '#F5F5F5', // Màu nền mới cho sản phẩm
      marginBottom: 30,
      marginHorizontal: 40,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
  },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 15,
        borderRadius: 5,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        color: '#000000', // Màu chữ tên sản phẩm
    },
    productPrice: {
        fontSize: 16,
        color: 'red', // Màu chữ giá sản phẩm
    },
    footer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: 'black', // Màu nền của footer
        alignItems: 'center',
    },
    footerText: {
        color: '#ffffff', // Màu chữ trong footer
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
        color: '#777777', // Màu chữ thông báo không có sản phẩm
    },
});


  export default HomePage;
