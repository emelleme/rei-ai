
import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperPlaneRight, Robot } from 'phosphor-react-native';

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

const mockMessages: AIMessage[] = [
  {
    id: '1',
    type: 'ai',
    message: 'Hello! I\'m your AI assistant. I can help you with questions about real estate concepts, exam preparation, and course materials. What would you like to know?',
    timestamp: new Date(),
  },
  {
    id: '2',
    type: 'user',
    message: 'What are the key differences between a listing agreement and a buyer\'s agreement?',
    timestamp: new Date(),
  },
  {
    id: '3',
    type: 'ai',
    message: 'Great question! A listing agreement is a contract between a seller and a real estate agent that authorizes the agent to represent the seller in marketing and selling their property. A buyer\'s agreement, on the other hand, is a contract between a buyer and an agent that establishes the agent\'s representation of the buyer in finding and purchasing property. The key differences include...',
    timestamp: new Date(),
  },
];

export default function AIAssistantScreen() {
  const [message, setMessage] = React.useState('');

  const sendMessage = () => {
    if (message.trim()) {
      // TODO: Implement OpenAI integration with RAG
      console.log('Sending AI query:', message);
      setMessage('');
    }
  };

  const renderMessage = ({ item }: { item: AIMessage }) => (
    <View className={`mb-4 px-6 ${item.type === 'user' ? 'items-end' : 'items-start'}`}>
      <View className={`max-w-[80%] rounded-lg p-4 ${
        item.type === 'user' ? 'bg-black' : 'bg-separator'
      }`}>
        {item.type === 'ai' && (
          <View className="flex-row items-center mb-2">
            <Robot size={16} color="#000000" weight="thin" />
            <Text className="font-poppins-medium text-black text-sm ml-2">
              AI Assistant
            </Text>
          </View>
        )}
        <Text className={`font-poppins-regular text-base ${
          item.type === 'user' ? 'text-white' : 'text-black'
        }`}>
          {item.message}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-4 border-b border-separator">
        <Text className="text-2xl font-poppins-semibold text-black">
          AI Assistant
        </Text>
        <Text className="text-sm font-poppins-light text-black mt-1">
          Get help with course materials and concepts
        </Text>
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
            placeholder="Ask a question..."
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
