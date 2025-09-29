import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Text, View, StyleSheet } from "react-native";
import { PokemonList } from "../../components/ui/pokemon-list";
import { pokemonData } from "../../app/constants/pokemon";

export default function PokemonScreen() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.title}>My Favourite Pokémons</Text>
                <PokemonList data={pokemonData.slice(0, 3)} />
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
