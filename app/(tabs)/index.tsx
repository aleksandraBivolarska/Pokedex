import React, { useMemo, useState } from "react";
import { Text, View, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePokemonList } from "../../hooks/use-pokemon";
import { PokemonList } from "@/components/ui/pokemon-list";

export default function PokemonScreen() {
  const { data, isLoading, error } = usePokemonList(0, 150);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = useMemo(() => {
    if (!data?.results) return [];
    return data.results.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#5631E8" />
        <Text style={styles.loadingText}>Loading Pokémon...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>Error loading Pokémon: {(error as Error).message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Pokémon..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>All Pokémon</Text>
        {filteredList.length ? (
          <Text style={styles.subtitle}>{filteredList.length} Pokémon found</Text>
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
    backgroundColor: "#f0f8ff",
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
    color: "#5631E8",
    fontFamily: "Rubik-Regular",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    color: "#0E0940",
    marginBottom: 4,
    fontFamily: "Rubik-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Rubik-Regular",
  },
  searchContainer: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#f0f8ff",
    marginTop: 12,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: "#0E0940",
    borderWidth: 1,
    borderColor: "#ddd",
    fontFamily: "Rubik-Regular",
  },
});
