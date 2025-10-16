import React from 'react';
import { FlatList, Image, StyleSheet, View, useWindowDimensions, Text } from 'react-native';

interface PokemonImageProps {
  id: string | number;
  size?: number;
}

export function PokemonImage({ id, size = 200 }: PokemonImageProps) {
  const { width } = useWindowDimensions();

  const images = [
  {
    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    label: 'Normal',
  },
  {
    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`,
    label: 'Shiny',
  },
];

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item.uri}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={[styles.container, { width }]}>
          <Image
            source={{ uri: item.uri }}
            style={[styles.image, { width: size, height: size }]}
            resizeMode="contain"
          />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  image: {
    backgroundColor: 'transparent',
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0E0940',
  },
});
