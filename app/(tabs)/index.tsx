import React, { useMemo, useState } from "react";
import { Text, View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePokemonList } from "../../hooks/use-pokemon";
import { PokemonList } from "@/components/ui/pokemon-list";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function PokemonScreen() {
  const { data, isLoading, error } = usePokemonList(0, 150);
  const [searchQuery, setSearchQuery] = useState("");
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const placeholderColor = useThemeColor({}, 'placeholder');
  const inputBackground = useThemeColor({}, 'inputBackground');
  const borderColor = useThemeColor({}, 'border');

  const filteredList = useMemo(() => {
    if (!data?.results) return [];
    return data.results.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor }]}>
        <ActivityIndicator size="large" color={tintColor} />
        <Text style={[styles.loadingText, { color: tintColor }]}>Loading Pokémon...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.center, { backgroundColor }]}>
        <Text style={[styles.errorText, { color: placeholderColor }]}>Error loading Pokémon: {(error as Error).message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={[styles.searchContainer, { backgroundColor }]}>
        <TextInput
          style={[styles.searchInput, {
            backgroundColor: inputBackground,
            color: textColor,
            borderColor: borderColor,
          }]}
          placeholder="Search Pokémon..."
          placeholderTextColor={placeholderColor}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>All Pokémon</Text>
        {filteredList.length ? (
          <Text style={[styles.subtitle, { color: placeholderColor }]}>{filteredList.length} Pokémon found</Text>
        ) : null}
      </View>

      <PokemonList
        data={filteredList}
        isLoading={isLoading}
        error={error}
        type="all"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
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
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
    fontFamily: "Rubik-Bold",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
  },
  searchContainer: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 12,
  },
  searchInput: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    fontFamily: "Rubik-Regular",
  },
});