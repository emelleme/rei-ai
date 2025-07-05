import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import '../global.css';
import '../lib/ui-config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useDatabase } from '@/hooks/useDatabase';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { initialized, error } = useDatabase();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins_300Light: require('@expo/google-fonts/poppins/Poppins_300Light.ttf'),
    Poppins_400Regular: require('@expo/google-fonts/poppins/Poppins_400Regular.ttf'),
    Poppins_500Medium: require('@expo/google-fonts/poppins/Poppins_500Medium.ttf'),
    Poppins_600SemiBold: require('@expo/google-fonts/poppins/Poppins_600SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}