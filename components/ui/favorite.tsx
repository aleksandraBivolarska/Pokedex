import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useIsFavorite, useToggleFavorite } from '../../hooks/use-favorite';

interface FavoriteProps {
  pokemonId: number;
  pokemonName: string;
  imageUrl?: string;
}

export default function Favorite({ pokemonId, pokemonName, imageUrl }: FavoriteProps) {
  const { data: isFavorited, isLoading } = useIsFavorite(pokemonId);
  const toggleFavorite = useToggleFavorite();

  const handleToggle = () => {
    if (isLoading || toggleFavorite.isPending) return;

    toggleFavorite.mutate(
      {
        pokemonId,
        name: pokemonName,
        imageUrl,
        isCurrentlyFavorite: isFavorited || false,
      },
      {
        onError: (err: any) => {
          Alert.alert("Error", `Could not update favorites: ${err.message || err}`);
        },
      }
    );
  };

  return (
    <TouchableOpacity
      style={styles.favoriteButton}
      onPress={handleToggle}
      disabled={isLoading || toggleFavorite.isPending}
    >
      {isLoading || toggleFavorite.isPending ? (
        <ActivityIndicator size="small" color="#FF6B6B" />
      ) : (
        <Ionicons
          name={isFavorited ? "heart" : "heart-outline"}
          size={24}
          color={isFavorited ? "#FF6B6B" : "#666"}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
