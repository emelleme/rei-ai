
import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Card, TextField, Button } from 'react-native-ui-lib';
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
    message: 'Hello! I\'m your real estate study assistant. Ask me anything about property law, market analysis, or exam prep!',
    timestamp: new Date(),
  },
  {
    id: '2',
    type: 'user',
    message: 'What are the key factors in property valuation?',
    timestamp: new Date(),
  },
  {
    id: '3',
    type: 'ai',
    message: 'Great question! The three main approaches to property valuation are:\n\n1. **Comparative Market Analysis (CMA)** - Comparing similar properties\n2. **Income Approach** - Based on rental income potential\n3. **Cost Approach** - Replacement cost minus depreciation\n\nEach method has its place depending on property type and market conditions.',
    timestamp: new Date(),
  },
];

export default function AIAssistantScreen() {
  const [message, setMessage] = React.useState('');

  const renderMessage = ({ item }: { item: AIMessage }) => (
    <View marginH-page marginB-card>
      <View row={item.type === 'user'} right={item.type === 'user'}>
        <Card 
          padding-card 
          backgroundColor={item.type === 'user' ? 'primary' : 'surface'}
          style={{ 
            borderRadius: 12,
            maxWidth: '80%',
            marginLeft: item.type === 'user' ? '20%' : 0,
          }}
        >
          {item.type === 'ai' && (
            <View row centerV marginB-section>
              <Robot size={16} color="#000000" weight="thin" />
              <Text caption color-textPrimary marginL-section>
                AI Assistant
              </Text>
            </View>
          )}
          <Text 
            body 
            color={item.type === 'user' ? 'secondary' : 'textPrimary'}
          >
            {item.message}
          </Text>
        </Card>
      </View>
    </View>
  );

  const sendMessage = () => {
    if (message.trim()) {
      console.log('Sending AI message:', message);
      setMessage('');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View paddingH-page paddingV-card style={{ borderBottomWidth: 1, borderBottomColor: '#F5F5F5' }}>
        <View row centerV marginB-section>
          <Robot size={24} color="#000000" weight="thin" />
          <Text heading color-textPrimary marginL-card>
            AI Assistant
          </Text>
        </View>
        <Text caption color-textSecondary>
          Your personal real estate study companion
        </Text>
      </View>

      <FlatList
        data={mockMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      />

      <View 
        paddingH-page 
        paddingV-card 
        style={{ borderTopWidth: 1, borderTopColor: '#F5F5F5' }}
      >
        <View row centerV>
          <TextField
            placeholder="Ask about real estate concepts..."
            value={message}
            onChangeText={setMessage}
            multiline
            style={{ 
              flex: 1,
              backgroundColor: '#F5F5F5',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
            }}
            fieldStyle={{ borderWidth: 0 }}
          />
          <Button
            onPress={sendMessage}
            marginL-card
            style={{ 
              backgroundColor: 'transparent',
              padding: 8,
            }}
          >
            <PaperPlaneRight size={24} color="#000000" weight="thin" />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
