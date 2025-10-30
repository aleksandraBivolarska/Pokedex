import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View, } from "react-native";
import { useRouter } from "expo-router";
import PokemonCard from "./pokemon-card";

interface PokemonListProps {
  data?: any[];
  isLoading?: boolean;
  error?: Error | null;
  type?: "all" | "favorites";
}

export const PokemonList: React.FC<PokemonListProps> = ({
  data = [],
  isLoading = false,
  error = null,
  type = "all",
}) => {
  const router = useRouter();

  const handlePokemonPress = (pokemonName: string) => {
    router.push(`/pokemon/${pokemonName}`);
  };

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

  if (!data || data.length === 0) {
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
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
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
});
