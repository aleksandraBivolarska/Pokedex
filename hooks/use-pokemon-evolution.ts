import { useEffect, useState } from 'react';
import { PokeApiService, EvolutionApiService } from '../app/services/pokemon-api';

export type EvolutionStage = {
  id: number;
  name: string;
  sprite: string;
};

export function usePokemonEvolution(pokemonId: number) {
  const [evolutions, setEvolutions] = useState<EvolutionStage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemonId) return;

    const fetchEvolutionChain = async () => {
      try {
        setLoading(true);
        setError(null);
        const species = await PokeApiService.getPokemonSpeciesById(pokemonId);
        const evoChainUrl = species.evolution_chain.url;
        const chainId = evoChainUrl.split('/').filter(Boolean).pop();

        const evolutionChain = await EvolutionApiService.getEvolutionChainById(Number(chainId));

        const stages: EvolutionStage[] = [];
        const traverse = (chain: any) => {
          const speciesUrl: string = chain.species.url;
          const id = Number(speciesUrl.split('/').filter(Boolean).pop());
          const name = chain.species.name;

          const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          stages.push({ id, name, sprite });
          chain.evolves_to.forEach((evo: any) => traverse(evo));
        };

        traverse(evolutionChain.chain);
        setEvolutions(stages);
      } catch (err) {
        console.error(err);
        setError('Failed to load evolution data.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutionChain();
  }, [pokemonId]);

  return { evolutions, loading, error };
}
