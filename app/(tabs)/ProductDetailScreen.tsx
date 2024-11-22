// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import axios from 'axios';

// const ProductDetailScreen = ({ route={} }) => {
//   const { productId } = route.params||{}; // Get productId from route parameters
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     // Fetch product details from the API using productId
//     axios.get(`https://fakestoreapi.com/products/${productId}`)
//       .then((response) => {
//         setProduct(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching product details', error);
//       });
//   }, [productId]);

//   if (!product) {
//     return <Text style={styles.loadingText}>Loading...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.productTitle}>{product.title}</Text>
//       <Text style={styles.productDescription}>{product.description}</Text>
//       <Text style={styles.productPrice}>Price: ${product.price}</Text>
      
//       <Button
//         title="Proceed to Payment"
//         onPress={() => navigation.navigate('PaymentScreen', { productId: productId })}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   productTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   productDescription: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 10,
//   },
//   productPrice: {
//     fontSize: 18,
//     color: 'green',
//     marginBottom: 20,
//   },
//   loadingText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 18,
//     color: '#777',
//   },
// });

// export default ProductDetailScreen;
