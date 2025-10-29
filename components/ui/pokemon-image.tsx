import React, { useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, View, useWindowDimensions, Text, TouchableOpacity } from 'react-native';

interface PokemonImageProps {
  id: string | number;
  size?: number;
}

export function PokemonImage({ id, size = 300 }: PokemonImageProps) {
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item) => item.uri}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToAlignment="center"
        snapToInterval={width}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={{ uri: item.uri }}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
            <Text style={styles.label}>{item.label}</Text>
          </View>
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {/* Navigation Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.circleButton, currentIndex === 0 && styles.activeButton]}
          onPress={() => goToIndex(0)}
        />
        <TouchableOpacity
          style={[styles.circleButton, currentIndex === 1 && styles.activeButton]}
          onPress={() => goToIndex(1)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0E0940',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  circleButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  activeButton: {
    backgroundColor: '#5631E8',
  },
});
