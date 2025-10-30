import { usePokemonByName } from '@/hooks/use-pokemon';
import { PokemonImage } from '@/components/ui/pokemon-image';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonTabs from '@/components/ui/pokemon-tabs';
import  typeColors  from '../constants/pokemonColors';

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams();
  const { data: pokemon, isLoading, error } = usePokemonByName(name as string);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5631E8" />
          <Text style={styles.loadingText}>Loading Pokémon...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !pokemon) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Pokémon not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.pokemonName}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
          <Text style={styles.pokemonId}>{pokemon.id.toString().padStart(3, '0')}</Text>
        </View>

        <View style={styles.typesContainer}>
          {pokemon.types.map((typeInfo, index) => {
            const typeName = typeInfo.type.name;
            const color = typeColors[typeName.toLowerCase()] || '#777';

            return (
              <View key={index} style={styles.typeBadge}>
                <View style={[styles.typeCircle, { backgroundColor: color }]} />
                <Text style={styles.typeText}>
                  {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.imageContainer}>
          <PokemonImage id={pokemon.id} size={200} />
        </View>
        <PokemonTabs pokemon={pokemon} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#5631E8',
    fontFamily: 'Rubik-Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
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
    color: '#0E0940',
    textTransform: 'capitalize',
  },
  pokemonId: {
    fontSize: 24,
    color: '#0E0940',
    opacity: 0.3,
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
  placeholderText: {
    fontSize: 16,
    color: '#999',
    fontFamily: 'Rubik-Regular',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Rubik-Bold',
    color: '#0E0940',
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 24,
  },
  typeBadge: {
    backgroundColor: '#0E094014',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  typeText: {
    color: '#0E0940',
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
