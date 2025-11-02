import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
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
        <ActivityIndicator size="large" color="#5631E8" />
        <Text style={styles.loadingText}>Loading Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading Pokémon: {error.message}</Text>
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

  const groupedData = [];
  for (let i = 0; i < data.length; i += 2) {
    groupedData.push(data.slice(i, i + 2));
  }

  return (
    <FlatList
      data={groupedData}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.cardsContainer}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.row}>
          {item.map((pokemon: any) => {
            const id =
              type === "favorites"
                ? pokemon.id
                : parseInt(pokemon.url.match(/\/pokemon\/(\d+)\//)?.[1] || "0", 10);

            const imageUrl =
              pokemon.imageUrl ||
              pokemon.image_url ||
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return (
              <View key={pokemon.name} style={styles.cardWrapper}>
                <PokemonCard
                  pokemon={{
                    id,
                    name: pokemon.name,
                    imageUrl,
                  }}
                  onPress={() => handlePokemonPress(pokemon.name)}
                />
              </View>
            );
          })}
          {item.length === 1 && <View style={styles.cardWrapper} />} 
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: "Rubik-Regular",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
    fontFamily: "Rubik-Medium",
    textAlign: "center",
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
});
