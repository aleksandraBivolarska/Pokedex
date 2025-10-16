import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, StyleSheet } from "react-native";
import { usePokemonList } from "../../hooks/use-pokemon";
import { PokemonList } from "@/components/ui/pokemon-list";

export default function PokemonScreen() {
  const { data, isLoading, error } = usePokemonList(0, 150);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}>All Pokémon</Text>
        <PokemonList
          data={data?.results}
          isLoading={isLoading}
          error={error}
          type="all"
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#EDF6FF",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 40,
    color: "#000",
    marginBottom: 16,
  },
});