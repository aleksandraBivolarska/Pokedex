// import React from "react";
// import { View, Text, StyleSheet, Pressable } from "react-native";
// import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
// import { pokemonData} from "../constants/pokemon";

// // Define the type in your [id].tsx file
// type Pokemon = {
//   id: number;
//   name: string;
//   type: string;
// };

// type RootStackParamList = {
//   PokemonDetail: { id: number };
// };

// type PokemonDetailRouteProp = RouteProp<RootStackParamList, "PokemonDetail">;

// export default function PokemonDetailScreen() {
//   const route = useRoute<PokemonDetailRouteProp>();
//   const navigation = useNavigation();
//   const { id } = route.params;

//   const numericId = Number(id); // Convert to number, otherwise it breaks
//     const pokemon: Pokemon | undefined = pokemonData.find((p) => p.id === numericId);

//   if (!pokemon) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Invalid Pokémon ID: {id}</Text>
//         <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Text style={styles.backButtonText}>Go Back</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   // Map Pokémon type to a color
//   const typeColors: { [key: string]: string } = {
//     Fire: "#F08030",
//     Water: "#6890F0",
//     Grass: "#78C850",
//     Electric: "#F8D030",
//     Ghost: "#705898",
//     Psychic: "#F85888",
//     // Add more types if needed
//   };

//   const typeColor = typeColors[pokemon.type] || "#AAA";

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{pokemon.name}</Text>
//       <Text style={styles.id}>#{pokemon.id.toString().padStart(3, "0")}</Text>

//       <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
//         <Text style={styles.typeText}>{pokemon.type}</Text>
//       </View>

//       <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={styles.backButtonText}>Go Back</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#EDF6FF",
//   },
//   name: {
//     fontSize: 32,
//     fontWeight: "800",
//     marginBottom: 8,
//   },
//   id: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginBottom: 16,
//   },
//   typeBadge: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 16,
//     marginBottom: 24,
//   },
//   typeText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   backButton: {
//     backgroundColor: "#5631E8",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 16,
//   },
//   backButtonText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   errorText: {
//     fontSize: 20,
//     color: "red",
//     marginBottom: 20,
//     textAlign: "center",
//   },
// });
