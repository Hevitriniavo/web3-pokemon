import { PokemonResult, ResponsePokemon } from "../types/type";

export async function getData(): Promise<ResponsePokemon[]>  {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const data = await response.json();
  
    const finalData: ResponsePokemon[] = await Promise.all(data.results.map(async (pokemon: PokemonResult) => {
      const response = await fetch(pokemon.url);
      const pokemonDetail = await response.json();
      return { name: pokemon.name, details: [pokemonDetail] };
    }));
  
    return finalData;
  };