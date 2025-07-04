
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Users, Clock } from 'phosphor-react-native';

interface Room {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  lastActivity: string;
}

const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Exam Prep',
    description: 'Study group for upcoming exams',
    memberCount: 24,
    lastActivity: '2 min ago',
  },
  {
    id: '2',
    name: 'Market Analysis',
    description: 'Discuss current market trends',
    memberCount: 18,
    lastActivity: '15 min ago',
  },
  {
    id: '3',
    name: 'Networking',
    description: 'Connect with industry professionals',
    memberCount: 31,
    lastActivity: '1 hour ago',
  },
];

export default function RoomsScreen() {
  const router = useRouter();

  const renderRoom = ({ item }: { item: Room }) => (
    <TouchableOpacity
      className="mx-6 mb-4 bg-separator rounded-lg p-4"
      onPress={() => router.push(`/rooms/${item.id}`)}
    >
      <Text className="font-poppins-semibold text-black text-lg mb-2">
        {item.name}
      </Text>
      <Text className="font-poppins-regular text-black text-sm mb-3">
        {item.description}
      </Text>
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Users size={16} color="#000000" weight="thin" />
          <Text className="font-poppins-light text-black text-xs ml-1">
            {item.memberCount} members
          </Text>
        </View>
        <View className="flex-row items-center">
          <Clock size={16} color="#000000" weight="thin" />
          <Text className="font-poppins-light text-black text-xs ml-1">
            {item.lastActivity}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-4 border-b border-separator">
        <Text className="text-2xl font-poppins-semibold text-black">
          Chat Rooms
        </Text>
        <Text className="text-sm font-poppins-light text-black mt-1">
          Join topic-specific discussions
        </Text>
      </View>

      <FlatList
        data={mockRooms}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16 }}
      />
    </SafeAreaView>
  );
}
