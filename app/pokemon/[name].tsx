import { PokemonImage } from '@/components/ui/pokemon-image';
import PokemonTabs from '@/components/ui/pokemon-tabs';
import { usePokemonByName } from '@/hooks/use-pokemon';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useIsFavorite, useToggleFavorite } from '../../hooks/use-favorite';
import { useLayoutEffect } from 'react';
import typeColors from '../constants/pokemonColors';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams();
  const navigation = useNavigation();

  const { data: pokemon, isLoading, error } = usePokemonByName(name as string);
  const { data: isFavorite } = useIsFavorite(pokemon?.id || 0);
  const toggleFavorite = useToggleFavorite();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const placeholderColor = useThemeColor({}, 'placeholder');
  const cardColor = useThemeColor({}, 'card');

  useLayoutEffect(() => {
    if (!pokemon) return;

    navigation.setOptions({
      title: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      headerStyle: {
        backgroundColor: backgroundColor,
      },
      headerTintColor: textColor,
      headerTitleStyle: {
        fontFamily: 'Rubik-Bold',
        color: textColor,
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            toggleFavorite.mutate({
              pokemonId: pokemon.id,
              name: pokemon.name,
              imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
              isCurrentlyFavorite: isFavorite || false,
            })
          }
          disabled={toggleFavorite.isPending}
          style={{ marginRight: 16 }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#FF6B6B' : textColor}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, pokemon, isFavorite, backgroundColor, textColor, toggleFavorite]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={tintColor} />
          <Text style={[styles.loadingText, { color: tintColor }]}>Loading Pokémon...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !pokemon) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: placeholderColor }]}>Pokémon not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.pokemonName, { color: textColor }]}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
          <Text style={[styles.pokemonId, { color: textColor, opacity: 0.5 }]}>
            {pokemon.id.toString().padStart(3, '0')}
          </Text>
        </View>

        <View style={styles.typesContainer}>
          {pokemon.types.map((typeInfo, index) => {
            const typeName = typeInfo.type.name;
            const color = typeColors[typeName.toLowerCase()] || '#777';

            return (
              <View key={index} style={[styles.typeBadge, { backgroundColor: cardColor }]}>
                <View style={[styles.typeCircle, { backgroundColor: color }]} />
                <Text style={[styles.typeText, { color: textColor }]}>
                  {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={[styles.imageContainer, { backgroundColor }]}>
          <PokemonImage id={pokemon.id} size={200} />
        </View>

        <PokemonTabs pokemon={pokemon} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pokemonName: {
    fontSize: 32,
    fontFamily: 'Rubik-Bold',
    textTransform: 'capitalize',
  },
  pokemonId: {
    fontSize: 24,
    fontFamily: 'Rubik-Regular',
    marginTop: 4,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 24,
  },
  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontFamily: 'Rubik-Bold',
    textTransform: 'capitalize',
  },
  typeCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
});