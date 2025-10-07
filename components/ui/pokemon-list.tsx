import React from "react";
import { View, Text, ActivityIndicator, FlatList, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { usePokemonList } from "@/hooks/use-pokemon";

export const PokemonList: React.FC = () => {
  const { data: pokemonList, isLoading, error } = usePokemonList(0, 150);
  const router = useRouter();

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

  return (
    <FlatList
      data={pokemonList?.results ?? []}
      keyExtractor={(item) => item.name}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.cardsContainer}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <Pressable
          style={styles.card}
          onPress={() => router.push(`/pokemon/${index + 1}`)}
        >
          <View style={styles.cardBackground}>
            <View style={styles.idBadge}>
              <Text style={styles.idText}>
                {(index + 1).toString().padStart(3, "0")}
              </Text>
            </View>
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  index + 1
                }.png`,
              }}
              style={styles.pokemonImage}
            />
          </View>
          <Text style={styles.pokemonName}>{item.name}</Text>
        </Pressable>
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
  cardsContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    paddingBottom: 16,
    alignItems: "center",
  },
  cardBackground: {
    width: "100%",
    backgroundColor: "#F6F6FF",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 8,
    position: "relative",
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0E0940",
    padding: 14,
    width: "100%",
    textAlign: "left",
    textTransform: "capitalize",
  },
  pokemonImage: {
    width: "80%",
    aspectRatio: 1,
    marginBottom: 8,
  },
  idBadge: {
    backgroundColor: "#5631E8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 1,
  },
  idText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    fontFamily: "Rubik",
  },
});
