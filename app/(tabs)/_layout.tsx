
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { House, ChatCircle, Robot, User } from 'phosphor-react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#999999',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#FFFFFF',
          },
          default: {
            backgroundColor: '#FFFFFF',
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Main Hall',
          tabBarIcon: ({ color }) => <House size={24} color={color} weight="thin" />,
        }}
      />
      <Tabs.Screen
        name="rooms"
        options={{
          title: 'Rooms',
          tabBarIcon: ({ color }) => <ChatCircle size={24} color={color} weight="thin" />,
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'AI Assistant',
          tabBarIcon: ({ color }) => <Robot size={24} color={color} weight="thin" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} weight="thin" />,
        }}
      />
    </Tabs>
  );
}
