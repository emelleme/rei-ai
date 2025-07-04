
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, Calendar, Gear, SignOut } from 'phosphor-react-native';

export default function ProfileScreen() {
  const handleSignOut = () => {
    // TODO: Implement sign out with Supabase
    console.log('Signing out...');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="px-6 py-4 border-b border-separator">
          <Text className="text-2xl font-poppins-semibold text-black">
            Profile
          </Text>
        </View>

        <View className="px-6 py-8 items-center border-b border-separator">
          <View className="w-24 h-24 bg-separator rounded-full items-center justify-center mb-4">
            <User size={32} color="#000000" weight="thin" />
          </View>
          <Text className="text-xl font-poppins-semibold text-black mb-2">
            John Doe
          </Text>
          <Text className="text-sm font-poppins-light text-black mb-4">
            Real Estate Student
          </Text>
          
          <View className="flex-row items-center mb-2">
            <MapPin size={16} color="#000000" weight="thin" />
            <Text className="font-poppins-regular text-black text-sm ml-2">
              San Francisco, CA
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <Calendar size={16} color="#000000" weight="thin" />
            <Text className="font-poppins-regular text-black text-sm ml-2">
              Joined December 2024
            </Text>
          </View>
        </View>

        <View className="px-6 py-4">
          <Text className="font-poppins-medium text-black text-lg mb-4">
            About
          </Text>
          <Text className="font-poppins-regular text-black text-base mb-6">
            Passionate about real estate and helping others achieve their property goals. Currently studying for my license and looking to connect with fellow students.
          </Text>
        </View>

        <View className="px-6 py-4 border-t border-separator">
          <TouchableOpacity className="flex-row items-center py-4">
            <Gear size={24} color="#000000" weight="thin" />
            <Text className="font-poppins-regular text-black text-base ml-4">
              Settings
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-row items-center py-4"
            onPress={handleSignOut}
          >
            <SignOut size={24} color="#000000" weight="thin" />
            <Text className="font-poppins-regular text-black text-base ml-4">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
