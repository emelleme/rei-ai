
import '../global.css';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
