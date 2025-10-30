import { PokemonClient, EvolutionClient } from 'pokenode-ts';

// Create singletons
const PokeApiService = new PokemonClient();
const EvolutionApiService = new EvolutionClient();

export { PokeApiService, EvolutionApiService };
export default PokeApiService;