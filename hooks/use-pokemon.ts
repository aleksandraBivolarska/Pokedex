import { useQuery } from '@tanstack/react-query';
import { NamedAPIResource } from 'pokenode-ts';
import { PokeApiService } from '../app/services/pokemon-api';

// Custom hook for fetching Pokemon list
export const usePokemonList = (limit: number = 20, offset: number = 0) => {
  return useQuery({
    queryKey: ['pokemon-list', limit, offset],
    queryFn: () => PokeApiService.listPokemons(limit, offset),
  });
};

export class Pokemon {
  id: number;
  name: string;
  imageUrl: string;

  constructor(name: string, url: string) {
    this.name = name;
    // Extract numeric ID from the Pokémon’s URL
    this.id = parseInt(url.split("/").filter(Boolean).pop() || "0");
    this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`;
  }
}

export const usePokemonByName = (name: string) => {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => PokeApiService.getPokemonByName(name),
    enabled: !!name, // Only run query if name is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};