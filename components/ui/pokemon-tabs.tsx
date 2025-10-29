import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

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
      <Text style={styles.label}>Abilites:</Text>
      {pokemon?.abilities?.map((abilityInfo, index) => (
      <Text key={index} style={styles.value}>
        {abilityInfo.ability.name.charAt(0).toUpperCase() +
          abilityInfo.ability.name.slice(1)}
      </Text>
    ))}
    </View>

  </>
)}
        {activeTab === 'stats' && (
          <>
            <Text style={styles.sectionTitle}>Base Stats</Text>
            {pokemon?.stats?.map((statInfo, index) => (
              <Text key={index}>
                {statInfo.stat.name.charAt(0).toUpperCase() +
                  statInfo.stat.name.slice(1)}
                : {statInfo.base_stat}
              </Text>
            ))}
          </>
        )}

        {activeTab === 'evolution' && (
          <>
            <Text style={styles.sectionTitle}>Evolution</Text>
            <Text>This could show evolution chain data.</Text>
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

});
