import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { databaseService } from '../app/services/database';

// Hook to get all favorite Pokemon
export const useFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => databaseService.getAllFavorites(),
    staleTime: 0, // Always fetch fresh data for favorites
  });
};

// Hook to check if a Pokemon is favorited
export const useIsFavorite = (pokemonId: number) => {
  return useQuery({
    queryKey: ['is-favorite', pokemonId],
    queryFn: () => databaseService.isFavorite(pokemonId),
    staleTime: 0,
  });
};

// Hook to toggle favorite status
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      pokemonId, 
      name, 
      imageUrl, 
      isCurrentlyFavorite 
    }: {
      pokemonId: number;
      name: string;
      imageUrl?: string;
      isCurrentlyFavorite: boolean;
    }) => {
      if (isCurrentlyFavorite) {
        await databaseService.removeFavorite(pokemonId);
      } else {
        await databaseService.addFavorite(pokemonId, name, imageUrl);
      }
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch favorites
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['is-favorite', variables.pokemonId] });
    },
  });
};