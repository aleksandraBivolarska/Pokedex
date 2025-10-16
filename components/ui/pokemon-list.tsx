import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import PokemonCard from "./pokemon-card";
import { FavoritePokemon } from "../../app/services/database";

interface PokemonListProps {
  data?: any[];              // Pokémon data (either from API or DB)
  isLoading?: boolean;
  error?: Error | null;
  type?: "all" | "favorites"; // Context of list
}

export const PokemonList: React.FC<PokemonListProps> = ({
  data = [],
  isLoading = false,
  error = null,
  type = "all",
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handlePokemonPress = (pokemonName: string) => {
    router.push(`/pokemon/${pokemonName}`);
  };

  const filteredList = useMemo(() => {
    if (!data) return [];
    return data.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error loading Pokémon: {error.message}</Text>
      </View>
    );
  }

  // 🧠 Empty state
  if (filteredList.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>
          {type === "favorites"
            ? "No favorites yet. Tap a heart to add one!"
            : "No Pokémon found."}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={
            type === "favorites" ? "Search favorites..." : "Search Pokémon..."
          }
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          // Handle API vs Favorites source
          const id =
            type === "favorites"
              ? item.id
              : parseInt(item.url.match(/\/pokemon\/(\d+)\//)?.[1] || "0", 10);

          const imageUrl =
            item.imageUrl ||
            item.image_url ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          return (
            <PokemonCard
              pokemon={{
                id,
                name: item.name,
                imageUrl,
              }}
              onPress={() => handlePokemonPress(item.name)}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#555",
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f0f8ff",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: "#0E0940",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
