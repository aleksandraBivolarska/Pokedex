import { Image } from "expo-image";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { pokemonData } from "../constants/pokemon";

export default function PokemonScreen() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>All Pokémon</Text>
        </View>

        <FlatList
          data={pokemonData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.cardsContainer}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => Alert.alert(`${item.name}`, `You pressed ${item.name}!`)}
            >
              <View style={styles.cardBackground}>
                <View style={styles.idBadge}>
                  <Text style={styles.idText}>{item.id.toString().padStart(3, "0")}</Text>
                </View>
                <Image
                  source={require(`../../assets/images/icon.png`)}
                  style={styles.pokemonImage}
                />
              </View>
              <Text style={styles.pokemonName}>{item.name}</Text>
            </Pressable>
          )}
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
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 40,
    color: "#000", 
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    paddingBottom: 16,
    alignItems: "center",
  },
  cardBackground: {
    width: "100%",
    backgroundColor: "#F6F6FF",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 8,
    position: "relative",
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0E0940",
    padding: 14,
    width: "100%",
    textAlign: "left",
  },
  pokemonImage: {
    width: "80%",
    aspectRatio: 1,
    marginBottom: 8,
  },
  idBadge: {
    backgroundColor: "#5631E8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 1,
  },
  idText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    fontFamily: "Rubik",
  },
});
