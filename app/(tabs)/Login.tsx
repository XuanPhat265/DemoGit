import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      // Navigate to the index page after successful login
      router.push('./index'); // Ensure `/index` is mapped correctly in your project
    } else {
      console.log('Tên đăng nhập hoặc mật khẩu không được để trống');
    }
  };

  return (
    <ImageBackground
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require('@/assets/images/logo.png')} // Replace with your logo image
          style={styles.logo}
        />
        <Text style={styles.title}>Đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Register')}>
          <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  linkText: {
    color: '#007AFF',
    marginTop: 20,
    fontSize: 16,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default LoginScreen;
