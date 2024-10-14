import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignUp = () => {
    console.log('Đăng ký với:', { username, email, phoneNumber, password, confirmPassword });

    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    // Nếu thông tin đăng ký hợp lệ, chuyển sang trang đăng nhập
    alert("Đăng ký thành công!");
    router.push('/Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Đăng ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        placeholderTextColor="#888"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập lại mật khẩu"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/Login')}>
        <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
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
});

export default RegisterScreen;
