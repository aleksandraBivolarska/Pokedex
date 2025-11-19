import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonList } from "@/components/ui/pokemon-list";
import { useFavorites } from '../../hooks/use-favorite';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function FavoritesScreen() {
  const { data: favorites, isLoading, error } = useFavorites();
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const placeholderColor = useThemeColor({}, 'placeholder');

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor }]}>
        <ActivityIndicator size="large" color={tintColor} />
        <Text style={[styles.loadingText, { color: tintColor }]}>Loading favorites...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor }]}>
        <Text style={[styles.errorText, { color: placeholderColor }]}>
          Error loading favorites: {(error as Error).message}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>My Favorites</Text>
        {favorites?.length ? (
          <Text style={[styles.subtitle, { color: placeholderColor }]}>
            {favorites.length} Pokémon saved
          </Text>
        ) : null}
      </View>

      <PokemonList
        data={favorites}
        isLoading={isLoading}
        error={error}
        type="favorites"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
    fontFamily: "Rubik-Bold",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
  },
});