import { router } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonCard from '../../components/ui/pokemon-card';
import { usePokemonList } from "../../hooks/use-pokemon";
import { PokemonList } from "@/components/ui/pokemon-list";
import { useFavorites } from '../../hooks/use-favorite';

export default function FavoritesScreen() {
  const { data: favorites, isLoading, error } = useFavorites();

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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    color: "#0E0940",
    marginBottom: 4,
    fontFamily: "Rubik-Bold", // changed from fontWeight bold
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Rubik-Regular", // regular font for subtitle
  },
});
