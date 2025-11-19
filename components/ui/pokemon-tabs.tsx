import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { usePokemonEvolution } from '../../hooks/use-pokemon-evolution';
import { StatBar } from './stat-bar';
import { useThemeColor } from '@/hooks/use-theme-color';

type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

type TabPaneProps = {
  pokemon: Pokemon | null;
  isLoading?: boolean;
  error?: Error | string | null;
};

export default function PokemonTabs({ pokemon, isLoading = false, error = null }: TabPaneProps) {
  const tabs: ('about' | 'stats' | 'evolution')[] = ['about', 'stats', 'evolution'];
  const [activeTab, setActiveTab] = useState<'about' | 'stats' | 'evolution'>('about');

  const { evolutions, loading: evolutionLoading, error: evolutionError } = usePokemonEvolution(pokemon?.id || 0);

  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const placeholderColor = useThemeColor({}, 'placeholder');

  if (isLoading) {
    return (
      <View style={[styles.center, { flex: 1 }]}>
        <ActivityIndicator size="large" color={tintColor} />
        <Text style={[styles.loadingText, { color: tintColor }]}>Loading Pokémon...</Text>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={[styles.center, { flex: 1 }]}>
        <Text style={[styles.errorText, { color: placeholderColor }]}>
          {typeof error === 'string' ? error : 'Error loading Pokémon data.'}
        </Text>
      </View>
    );
  }

  const onSwipeLeft = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
  };

  const onSwipeRight = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
      style={{ flex: 1 }}
    >
      {/* Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: cardColor }]}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
          >
            <Text style={[styles.tabText, activeTab === tab && [styles.activeTabText, { color: tintColor }], { color: placeholderColor }]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.detailsContainer, { backgroundColor: cardColor }]}>
        {activeTab === 'about' && (
          <>
            <Text style={[styles.sectionTitle, { color: textColor }]}>About</Text>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: textColor }]}>Name:</Text>
              <Text style={[styles.value, { color: textColor }]}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: textColor }]}>ID:</Text>
              <Text style={[styles.value, { color: textColor }]}>{pokemon.id.toString().padStart(3, '0')}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: textColor }]}>Base:</Text>
              <Text style={[styles.value, { color: textColor }]}>{pokemon.base_experience} XP</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: textColor }]}>Weight:</Text>
              <Text style={[styles.value, { color: textColor }]}>{pokemon.weight}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: textColor }]}>Height:</Text>
              <Text style={[styles.value, { color: textColor }]}>{pokemon.height}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: textColor }]}>Types:</Text>
              <Text style={[styles.value, { color: textColor }]}>
                {pokemon.types
                  .map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1))
                  .join(', ')}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: textColor }]}>Abilities:</Text>
              <Text style={[styles.value, { color: textColor }]}>
                {pokemon.abilities
                  .map((a) => a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1))
                  .join(', ')}
              </Text>
            </View>
          </>
        )}

        {activeTab === 'stats' && (
          <>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Base Stats</Text>
            {pokemon.stats.map((statInfo, index) => (
              <StatBar key={index} name={statInfo.stat.name} value={statInfo.base_stat} max={255} />
            ))}
          </>
        )}

        {activeTab === 'evolution' && (
          <>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Evolution</Text>

            {evolutionLoading && (
              <ActivityIndicator size="large" color={tintColor} style={{ marginTop: 20 }} />
            )}

            {evolutionError && (
              <Text style={[styles.errorText, { marginTop: 10, color: placeholderColor }]}>
                {typeof evolutionError === 'string' ? evolutionError : 'Error loading evolution data.'}
              </Text>
            )}

            {!evolutionLoading && !evolutionError && evolutions.length > 0 && (
              <View style={styles.evolutionList}>
                {evolutions.map((evo) => (
                  <View key={evo.id} style={[styles.evolutionRow, { backgroundColor }]}>
                    <Image
                      source={{ uri: evo.sprite }}
                      style={styles.evolutionImage}
                      resizeMode="contain"
                      onError={() => console.warn(`Failed to load image for ${evo.name}`)}
                    />
                    <Text style={[styles.evolutionName, { color: textColor }]}>
                      {evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {!evolutionLoading && !evolutionError && evolutions.length === 0 && (
              <Text style={[styles.value, { marginTop: 10, color: textColor }]}>No evolution data available.</Text>
            )}
          </>
        )}
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#5631E8',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  activeTabText: {
    fontFamily: 'Rubik-Bold',
  },
  detailsContainer: {
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Rubik-Bold',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
  value: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
  },
  evolutionList: {
    marginTop: 8,
  },
  evolutionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  evolutionImage: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  evolutionName: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
  },
});