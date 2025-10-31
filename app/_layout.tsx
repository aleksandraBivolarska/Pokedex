import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { databaseService } from './services/database';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { View, Text } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Create a QueryClient instance with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    databaseService.initDatabase().catch(console.error);

    async function loadFonts() {
      await Font.loadAsync({
        'Rubik-Black': require('../assets/fonts/Rubik-Black.ttf'),
        'Rubik-BlackItalic': require('../assets/fonts/Rubik-BlackItalic.ttf'),
        'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf'),
        'Rubik-BoldItalic': require('../assets/fonts/Rubik-BoldItalic.ttf'),
        'Rubik-ExtraBold': require('../assets/fonts/Rubik-ExtraBold.ttf'),
        'Rubik-ExtraBoldItalic': require('../assets/fonts/Rubik-ExtraBoldItalic.ttf'),
        'Rubik-Italic': require('../assets/fonts/Rubik-Italic.ttf'),
        'Rubik-Light': require('../assets/fonts/Rubik-Light.ttf'),
        'Rubik-LightItalic': require('../assets/fonts/Rubik-LightItalic.ttf'),
        'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf'),
        'Rubik-MediumItalic': require('../assets/fonts/Rubik-MediumItalic.ttf'),
        'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf'),
        'Rubik-RegularItalic': require('../assets/fonts/Rubik-RegularItalic.ttf'),
        'Rubik-SemiBold': require('../assets/fonts/Rubik-SemiBold.ttf'),
        'Ruvik-SemiBoldItalic': require('../assets/fonts/Rubik-SemiBoldItalic.ttf')
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="pokemon/[name]" options={{ title: 'Back' }} />
          
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
