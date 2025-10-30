import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Modal, Alert, Share } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useIsFavorite, useToggleFavorite } from "../../hooks/use-favorite";
import Favorite from "./favorite";

interface PokemonCardProps {
  pokemon: {
    id: number | string;
    name: string;
    imageUrl?: string;
  };
  onPress: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const id = typeof pokemon.id === "string" ? parseInt(pokemon.id) : pokemon.id;

  const imageUrl =
    pokemon.imageUrl ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const { data: isFavorite } = useIsFavorite(id);
  const toggleFavorite = useToggleFavorite();

  const handleOpenPokemon = () => {
    setModalVisible(false);
    onPress();
  };

  const handleAddToFavorites = async () => {
    setModalVisible(false);
    toggleFavorite.mutate(
      {
        pokemonId: id,
        name: pokemon.name,
        imageUrl,
        isCurrentlyFavorite: !!isFavorite,
      },
      {
        onSuccess: () => {
          Alert.alert(
            isFavorite ? "Removed from Favorites" : "Added to Favorites",
            `${pokemon.name} has been ${isFavorite ? "removed" : "added"}!`
          );
        },
        onError: () => {
          Alert.alert("Error", "Could not update favorites.");
        },
      }
    );
  };

  const handleShare = async () => {
    try {
      setModalVisible(false);
      await Share.share({
        message: `Check out this Pokémon: ${pokemon.name}!\n${imageUrl}`,
        url: imageUrl,
        title: pokemon.name,
      });
    } catch (error) {
      Alert.alert("Error", "Could not share Pokémon.");
    }
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardBackground}>
        <View style={styles.idBadge}>
          <Text style={styles.idText}>{id.toString().padStart(3, "0")}</Text>
        </View>

        <View style={styles.favoriteContainer}>
          <Favorite
            pokemonId={id}
            pokemonName={pokemon.name}
            imageUrl={imageUrl}
          />
        </View>

        <Image source={{ uri: imageUrl }} style={styles.pokemonImage} />
      </View>

      <View style={styles.cardLabel}>
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionicons name="ellipsis-horizontal-outline" size={20} />
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.bottomModalContainer}>
            <View style={styles.modalCard}>
              <Pressable style={styles.modalRow} onPress={handleOpenPokemon}>
                <Ionicons
                  name="open-outline"
                  size={20}
                  color="#007AFF"
                  style={styles.modalIcon}
                />
                <Text style={styles.modalText}>Open Pokémon</Text>
              </Pressable>

              <Pressable style={styles.modalRow} onPress={handleAddToFavorites}>
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={20}
                  color="#007AFF"
                  style={styles.modalIcon}
                />
                <Text style={styles.modalText}>
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </Text>
              </Pressable>

              <Pressable style={styles.modalRow} onPress={handleShare}>
                <Ionicons
                  name="share-outline"
                  size={20}
                  color="#007AFF"
                  style={styles.modalIcon}
                />
                <Text style={styles.modalText}>Share</Text>
              </Pressable>
            </View>

            <View style={styles.cancelCard}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
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
  cardLabel: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: "space-between",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  bottomModalContainer: {
    padding: 8,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5EA",
  },
  modalIcon: {
    marginRight: 12,
  },
  modalText: {
    fontSize: 16,
    color: "#0E0940",
  },
  cancelCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 17,
    color: "#007AFF",
    fontWeight: "600",
  },
});
