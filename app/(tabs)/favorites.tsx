import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PokemonList } from "@/components/ui/pokemon-list";
import { useFavorites } from '../../hooks/use-favorite';

export default function FavoritesScreen() {
  const { data: favorites, isLoading, error } = useFavorites();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#5631E8" />
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>
          Error loading favorites: {(error as Error).message}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        {favorites?.length ? (
          <Text style={styles.subtitle}>
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
    backgroundColor: "#f0f8ff",
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
    color: "#5631E8",
    fontFamily: "Rubik-Regular",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    color: "#0E0940",
    marginBottom: 4,
    fontFamily: "Rubik-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Rubik-Regular",
  },
});
