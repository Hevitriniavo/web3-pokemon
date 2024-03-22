import React from 'react';
import Image from 'next/image';
import { Pokemon } from '../types/type'; 

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
 return (
    <div className="pokemon-card">
      <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
      <h3>{pokemon.name}</h3>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
 );
};