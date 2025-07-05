
import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Card, TextField, Button } from 'react-native-ui-lib';
import { PaperPlaneRight } from 'phosphor-react-native';

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
}

const mockMessages: Message[] = [
  {
    id: '1',
    user: 'Sarah Chen',
    message: 'Hey everyone! Just passed my first exam 🎉',
    timestamp: new Date(),
  },
  {
    id: '2',
    user: 'Mike Rodriguez',
    message: 'Congrats! Which topic was the most challenging?',
    timestamp: new Date(),
  },
];

export default function MainHallScreen() {
  const [message, setMessage] = React.useState('');

  const renderMessage = ({ item }: { item: Message }) => (
    <View marginH-page marginB-card>
      <Card 
        padding-card 
        backgroundColor-surface
        style={{ borderRadius: 12 }}
      >
        <Text subheading color-textPrimary marginB-section>
          {item.user}
        </Text>
        <Text body color-textPrimary>
          {item.message}
        </Text>
      </Card>
    </View>
  );

  const sendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View paddingH-page paddingV-card style={{ borderBottomWidth: 1, borderBottomColor: '#F5F5F5' }}>
        <Text heading color-textPrimary>
          Main Hall
        </Text>
        <Text caption color-textSecondary marginT-section>
          General discussion for all students
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
            placeholder="Type a message..."
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
