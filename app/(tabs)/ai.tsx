
import React from 'react';
import { FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Card, TextField, Button } from 'react-native-ui-lib';
import { PaperPlaneRight, Robot, Sparkle } from 'phosphor-react-native';
import { useAIStore, AIMessage } from '../../store/ai';
import { geminiService } from '../../lib/services/gemini';

export default function AIAssistantScreen() {
  const [message, setMessage] = React.useState('');
  const { messages, isLoading, error, addMessage, setLoading, setError } = useAIStore();

  const sendMessage = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = message.trim();
      setMessage('');
      
      // Add user message
      addMessage({
        role: 'user',
        content: userMessage,
      });

      setLoading(true);
      setError(null);

      try {
        // Convert messages to Gemini format
        const conversationHistory = messages.slice(1).map(msg => ({
          role: msg.role === 'assistant' ? 'model' as const : 'user' as const,
          parts: msg.content,
        }));

        const response = await geminiService.generateResponse(userMessage, conversationHistory);
        
        // Add AI response
        addMessage({
          role: 'assistant',
          content: response,
        });
      } catch (error) {
        console.error('Error sending message:', error);
        setError('Failed to get response from REI Mentor. Please try again.');
        Alert.alert('Error', 'Failed to get response from REI Mentor. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const renderMessage = ({ item }: { item: AIMessage }) => (
    <View marginH-page marginB-card>
      <View row={item.role === 'user'} right={item.role === 'user'}>
        <Card 
          padding-card 
          backgroundColor={item.role === 'user' ? 'primary' : 'surface'}
          style={{ 
            borderRadius: 12,
            maxWidth: '85%',
            marginLeft: item.role === 'user' ? '15%' : 0,
          }}
        >
          {item.role === 'assistant' && (
            <View row centerV marginB-section>
              <Sparkle size={16} color="#000000" weight="thin" />
              <Text caption color-textPrimary marginL-section>
                REI Mentor
              </Text>
            </View>
          )}
          <Text 
            body 
            color={item.role === 'user' ? 'secondary' : 'textPrimary'}
            style={{ lineHeight: 22 }}
          >
            {item.content}
          </Text>
        </Card>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View paddingH-page paddingV-card style={{ borderBottomWidth: 1, borderBottomColor: '#F5F5F5' }}>
        <View row centerV marginB-section>
          <Sparkle size={24} color="#000000" weight="thin" />
          <Text heading color-textPrimary marginL-card>
            Ask D'
          </Text>
        </View>
        <Text caption color-textSecondary>
          Your Socratic learning mentor by Darrell Dorsey
        </Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {isLoading && (
        <View paddingH-page marginB-section>
          <View row centerV>
            <Sparkle size={16} color="#666666" weight="thin" />
            <Text caption color-textSecondary marginL-section>
              REI Mentor is thinking...
            </Text>
          </View>
        </View>
      )}

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
            editable={!isLoading}
            style={{ 
              flex: 1,
              backgroundColor: isLoading ? '#F9F9F9' : '#F5F5F5',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              opacity: isLoading ? 0.6 : 1,
            }}
            fieldStyle={{ borderWidth: 0 }}
            onSubmitEditing={sendMessage}
          />
          <Button
            onPress={sendMessage}
            marginL-card
            disabled={isLoading || !message.trim()}
            style={{ 
              backgroundColor: 'transparent',
              padding: 8,
              opacity: (isLoading || !message.trim()) ? 0.4 : 1,
            }}
          >
            <PaperPlaneRight size={24} color="#000000" weight="thin" />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
