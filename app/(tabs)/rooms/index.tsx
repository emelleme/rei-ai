
import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { View, Text, Card, TouchableOpacity } from 'react-native-ui-lib';
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
    name: 'Property Analysis',
    description: 'Discuss market analysis and property valuations',
    memberCount: 24,
    lastActivity: '2 minutes ago',
  },
  {
    id: '2',
    name: 'Exam Prep',
    description: 'Study group for upcoming licensing exams',
    memberCount: 18,
    lastActivity: '15 minutes ago',
  },
  {
    id: '3',
    name: 'Networking',
    description: 'Connect with fellow students and professionals',
    memberCount: 32,
    lastActivity: '1 hour ago',
  },
];

export default function RoomsScreen() {
  const router = useRouter();

  const renderRoom = ({ item }: { item: Room }) => (
    <View marginH-page marginB-card>
      <TouchableOpacity 
        onPress={() => router.push(`/rooms/${item.id}`)}
        activeOpacity={0.7}
      >
        <Card 
          padding-card 
          backgroundColor-background
          style={{ 
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#F5F5F5',
          }}
        >
          <Text subheading color-textPrimary marginB-section>
            {item.name}
          </Text>
          <Text body color-textSecondary marginB-card>
            {item.description}
          </Text>
          
          <View row spread centerV>
            <View row centerV>
              <Users size={16} color="#666666" weight="thin" />
              <Text caption color-textSecondary marginL-section>
                {item.memberCount} members
              </Text>
            </View>
            
            <View row centerV>
              <Clock size={16} color="#666666" weight="thin" />
              <Text caption color-textSecondary marginL-section>
                {item.lastActivity}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View paddingH-page paddingV-card style={{ borderBottomWidth: 1, borderBottomColor: '#F5F5F5' }}>
        <Text heading color-textPrimary>
          Study Rooms
        </Text>
        <Text caption color-textSecondary marginT-section>
          Join topic-focused discussions
        </Text>
      </View>

      <FlatList
        data={mockRooms}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
