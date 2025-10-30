import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { StatBar } from './stat-bar';
import { usePokemonEvolution } from '../../hooks/use-pokemon-evolution';   
import { ActivityIndicator, Image } from 'react-native';

type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

type TabPaneProps = {
  pokemon: Pokemon;
};

export default function PokemonTabs({ pokemon }: TabPaneProps) {
  const tabs: ('about' | 'stats' | 'evolution')[] = ['about', 'stats', 'evolution'];
  const [activeTab, setActiveTab] = useState<'about' | 'stats' | 'evolution'>('about');
  const { evolutions, loading, error } = usePokemonEvolution(pokemon.id);

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
      {/* --- Tab Buttons --- */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* --- Tab Content --- */}
      <View style={styles.detailsContainer}>
        {activeTab === 'about' && (
  <>
    <Text style={styles.sectionTitle}>About</Text>

    <View style={styles.infoRow}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
    </View>

    <View style={styles.infoRow}>
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.value}>{pokemon.id.toString().padStart(3, '0')}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.label}>Base:</Text>
      <Text style={styles.value}>{pokemon.base_experience + " XP"}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.label}>Height:</Text>
      <Text style={styles.value}>{pokemon.height}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.label}>Weight:</Text>
      <Text style={styles.value}>{pokemon.weight}</Text>
    </View>

    <View style={styles.infoRow}>
  <Text style={styles.label}>Abilities:</Text>
  <Text style={styles.value}>
    {pokemon.abilities
      .map(a => a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1))
      .join(', ')}
  </Text>
</View>

  </>
)}
        {activeTab === 'stats' && (
  <>
    <Text style={styles.sectionTitle}>Base Stats</Text>
    {pokemon?.stats?.map((statInfo, index) => (
      <StatBar
        key={index}
        name={statInfo.stat.name}
        value={statInfo.base_stat}
        max={255} // Pokémon stats max value, adjust if needed
      />
    ))}
  </>
)}


{activeTab === 'evolution' && (
  <>
    <Text style={styles.sectionTitle}>Evolution</Text>

    {loading && <ActivityIndicator size="large" color="#5631E8" style={{ marginTop: 20 }} />}
    {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}

    {!loading && !error && evolutions.length > 0 && (
      <View style={styles.evolutionList}>
        {evolutions.map((evo) => (
          <View key={evo.id} style={styles.evolutionRow}>
            <Image
              source={{ uri: evo.sprite }}
              style={styles.evolutionImage}
              resizeMode="contain"
            />
            <Text style={styles.evolutionName}>
              {evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}
            </Text>
          </View>
        ))}
      </View>
    )}

    {!loading && !error && evolutions.length === 0 && (
      <Text style={{ marginTop: 10 }}>No evolution data available.</Text>
    )}
  </>
)}
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
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
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#5631E8',
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0E0940',
    marginBottom: 12,
  },
  infoRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 6,
},
label: {
  fontWeight: 'bold',
  color: '#0E0940',
  fontSize: 16,
},
value: {
  color: '#333',
  fontSize: 16,
},

evolutionList: {
  marginTop: 8,
},
evolutionRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
  backgroundColor: '#F7F7F7',
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
  fontWeight: '600',
  color: '#0E0940',
},


});
