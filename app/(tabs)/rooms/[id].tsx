
import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, PaperPlaneRight } from 'phosphor-react-native';

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
}

const mockMessages: Message[] = [
  {
    id: '1',
    user: 'Alex Johnson',
    message: 'Anyone have notes from the contract law section?',
    timestamp: new Date(),
  },
  {
    id: '2',
    user: 'Emma Davis',
    message: 'I can share mine! DM me your email',
    timestamp: new Date(),
  },
];

export default function RoomChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = React.useState('');

  const sendMessage = () => {
    if (message.trim()) {
      console.log('Sending message to room:', id, message);
      setMessage('');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View className="mb-4 px-6">
      <View className="bg-separator rounded-lg p-4">
        <Text className="font-poppins-medium text-black text-sm mb-1">
          {item.user}
        </Text>
        <Text className="font-poppins-regular text-black text-base">
          {item.message}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-4 border-b border-separator flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#000000" weight="thin" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-xl font-poppins-semibold text-black">
            Room {id}
          </Text>
          <Text className="text-sm font-poppins-light text-black">
            24 members active
          </Text>
        </View>
      </View>

      <FlatList
        data={mockMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16 }}
      />

      <View className="px-6 py-4 border-t border-separator">
        <View className="flex-row items-center bg-separator rounded-lg px-4 py-2">
          <TextInput
            className="flex-1 font-poppins-regular text-base"
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity onPress={sendMessage} className="ml-3">
            <PaperPlaneRight size={24} color="#000000" weight="thin" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
