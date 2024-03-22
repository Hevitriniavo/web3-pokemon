import { Pokemon, PokemonResult, ResponsePokemon } from "../types/type";

export async function getData(): Promise<ResponsePokemon[]>  {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50');
    const data = await response.json();
  
    const finalData: ResponsePokemon[] = await Promise.all(data.results.map(async (pokemon: PokemonResult) => {
      const res = await fetch(pokemon.url);
      const pokemonDetail = await res.json();
      return { name: pokemon.name, details: [pokemonDetail] };
    }));
  
    return finalData;
  };

export async function getDataById(order: number): Promise<Pokemon>  {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${order}`);
    const pokemon : Pokemon = await response.json();
    return pokemon;
  };