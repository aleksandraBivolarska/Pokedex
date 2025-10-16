import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Favorite from "./favorite";
import { Ionicons } from "@expo/vector-icons";

interface PokemonCardProps {
  pokemon: {
    id: number | string;
    name: string;
    imageUrl?: string;
  };
  onPress: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onPress }) => {
  const id = typeof pokemon.id === "string" ? parseInt(pokemon.id) : pokemon.id;

  // If no imageUrl is passed (e.g., from favorites), construct one from the id
  const imageUrl =
    pokemon.imageUrl ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardBackground}>
        <View style={styles.idBadge}>
          <Text style={styles.idText}>{id.toString().padStart(3, "0")}</Text>
        </View>

        <View style={styles.favoriteContainer}>
          <Favorite pokemonId={id} pokemonName={pokemon.name} imageUrl={imageUrl} />
        </View>

        <Image source={{ uri: imageUrl }} style={styles.pokemonImage} />
      </View>
      <View style={styles.cardLabel}>
        <Text style={styles.pokemonName}>{pokemon.name}</Text>  
        <Ionicons name="ellipsis-vertical-outline" size={16} />
      </View>
      

    </Pressable>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  cardBackground: {
    width: "100%",
    backgroundColor: "#F6F6FF",
    alignItems: "center",
    paddingVertical: 16,
    position: "relative",
  },
  favoriteContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0E0940",
    width: "100%",
    textTransform: "capitalize",
  },
  cardLabel:{
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignContent: "center",
    alignItems: "center",
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