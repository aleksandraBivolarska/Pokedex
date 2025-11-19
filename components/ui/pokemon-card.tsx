import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Modal, Alert, Share, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useIsFavorite, useToggleFavorite } from "../../hooks/use-favorite";
import Favorite from "./favorite";
import { useThemeColor } from "@/hooks/use-theme-color";

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

  const backgroundColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const placeholderColor = useThemeColor({}, 'placeholder');
  const cardImageBackground = useThemeColor({}, 'cardImageBackground');
  const idTextColor = useThemeColor({}, 'idText');

  const imageUrl =
    pokemon.imageUrl ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const {
    data: isFavorite,
    isLoading,
    error,
  } = useIsFavorite(id);
  const toggleFavorite = useToggleFavorite();

  // Handle loading state
  if (isLoading) {
    return (
      <View style={[styles.card, styles.center, { backgroundColor }]}>
        <ActivityIndicator size="large" color={tintColor} />
        <Text style={[styles.loadingText, { color: tintColor }]}>Loading Pokémon...</Text>
      </View>
    );
  }

  // Handle error state
  if (error) {
    return (
      <View style={[styles.card, styles.center, { backgroundColor }]}>
        <Text style={[styles.errorText, { color: placeholderColor }]}>
          Error loading Pokémon: {(error as Error).message}
        </Text>
      </View>
    );
  }

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
        onError: () => {
          Alert.alert("Error", "Could not update favorites.");
        },
      }
    );
  };

  const handleShare = async () => {
  try {
    const result = await Share.share({
      message: `Check out this Pokémon: ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}!\n${imageUrl}`,
      url: imageUrl,
      title: pokemon.name,
    });
    
    // Only hide the modal if the share was completed or dismissed
    if (result.action === Share.sharedAction || result.action === Share.dismissedAction) {
      setModalVisible(false);
    }
  } catch {
    Alert.alert("Error", "Could not share Pokémon.");
    setModalVisible(false); // Still hide modal on error
  }
};


  return (
    <Pressable style={[styles.card, { backgroundColor }]} onPress={onPress}>
      <View style={[styles.cardBackground, { backgroundColor: cardImageBackground }]}>
        <View style={[styles.idBadge, { backgroundColor: tintColor }]}>
          <Text style={[styles.idText, { color: idTextColor }]}>{id.toString().padStart(3, "0")}</Text>
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
        <Text style={[styles.pokemonName, { color: textColor }]}>{pokemon.name}</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Ionicons name="ellipsis-horizontal-outline" size={20} color={textColor} />
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
            <View style={[styles.modalCard, { backgroundColor }]}>
              <Pressable style={styles.modalRow} onPress={handleOpenPokemon}>
                <Ionicons
                  name="open-outline"
                  size={20}
                  color={tintColor}
                  style={styles.modalIcon}
                />
                <Text style={[styles.modalText, { color: textColor }]}>Open Pokémon</Text>
              </Pressable>

              <Pressable style={styles.modalRow} onPress={handleAddToFavorites}>
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={20}
                  color={tintColor}
                  style={styles.modalIcon}
                />
                <Text style={[styles.modalText, { color: textColor }]}>
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </Text>
              </Pressable>

              <Pressable style={styles.modalRow} onPress={handleShare}>
                <Ionicons
                  name="share-outline"
                  size={20}
                  color={tintColor}
                  style={styles.modalIcon}
                />
                <Text style={[styles.modalText, { color: textColor }]}>Share</Text>
              </Pressable>
            </View>

            <View style={[styles.cancelCard, { backgroundColor }]}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={[styles.cancelText, { color: tintColor }]}>Cancel</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
  },
  errorText: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    textAlign: "center",
  },
  cardBackground: {
    width: "100%",
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 1,
  },
  idText: {
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
  },
  cancelCard: {
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 17,
    fontWeight: "600",
  },
});