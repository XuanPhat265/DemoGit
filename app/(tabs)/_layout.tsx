import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      /> */}

<Tabs.Screen
        name="Register"
        options={{
          title: 'Đăng ký ',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon  name="add-circle" size={24} color={color} />
            
          ),
        }}
      />
<Tabs.Screen
        name="Login"
        options={{
          title: 'Đăng nhập',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon  name="arrow-back-circle-sharp" size={24} color={color} />
            
          ),
        }}
      />   
    

      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon  name="home" size={24} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="cart"
        options={{
          title: 'Giỏ hàng',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon  name="bag" size={24} color={color} />
            
          ),
        }}
      />  
      <Tabs.Screen
        name="ProductDetailScreen"
        options={{
          title: 'Thanh toán',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon  name="bag-check-sharp" size={24} color={color} />
            
          ),
        }}
      />  
      <Tabs.Screen
        name="ProductDetail"
        options={{
          title: 'Chi tiết sản phẩm',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon  name="reorder-three" size={24} color={color} />
            
          ),
        }}
      />  
    </Tabs>
    
  );

}
