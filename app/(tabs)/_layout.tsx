import { HapticTab } from '@/components/haptic-tab';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabLayout() {
  const tabBarActive = useThemeColor({}, 'tabBarActive');
  const tabBarInactive = useThemeColor({}, 'tabBarInactive');
  const tabBarBackground = useThemeColor({}, 'tabBarBackground');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tabBarActive,
        tabBarInactiveTintColor: tabBarInactive,
        tabBarButton: HapticTab,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tabBarBackground,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pokemon',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="invert-mode-outline" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}