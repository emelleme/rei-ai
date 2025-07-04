
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMagicLink = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement Supabase magic link authentication
      console.log('Sending magic link to:', email);
      Alert.alert('Success', 'Check your email for the magic link!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send magic link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        <View className="mb-12">
          <Text className="text-4xl font-poppins-semibold text-black text-center mb-4">
            REI Connect
          </Text>
          <Text className="text-lg font-poppins-light text-black text-center">
            Connect with fellow real estate students
          </Text>
        </View>

        <View className="mb-8">
          <Text className="text-base font-poppins-medium text-black mb-3">
            Email Address
          </Text>
          <TextInput
            className="border border-separator rounded-lg px-4 py-4 text-base font-poppins-regular"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          className={`bg-black rounded-lg py-4 ${loading ? 'opacity-50' : ''}`}
          onPress={handleMagicLink}
          disabled={loading}
        >
          <Text className="text-white text-center text-base font-poppins-medium">
            {loading ? 'Sending...' : 'Send Magic Link'}
          </Text>
        </TouchableOpacity>

        <Text className="text-sm font-poppins-light text-black text-center mt-6">
          We'll send you a secure link to sign in
        </Text>
      </View>
    </SafeAreaView>
  );
}
