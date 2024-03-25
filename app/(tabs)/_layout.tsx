import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Image } from 'expo-image';
import { Pressable, TextInput, Text, View } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTintColor: 'tomato',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitle() {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  placeholder="Pesquisar..."
                  style={{ backgroundColor: 'white', color: 'tomato', width: `85%`, height: 40, margin: 10, borderRadius: 5, padding: 5, fontSize: 16 }}>

                </TextInput>
                <Pressable>
                  <TabBarIcon name='search' color='white' />
                </Pressable>
              </View>
            );
          },
          headerBackground(props) {
            return (
              <Image
                {...props}
                style={{ width: '100%', height: "100%" }}
                contentFit="cover"
                source={require('@/assets/images/header.png')}
              />
            );
          },
          headerStatusBarHeight: 150,


        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Cadastro de Competidor',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
