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