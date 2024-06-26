import React from 'react';
import { getDataById } from "@/app/services/fetch";
import { Pokemon } from '@/app/types/type';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }:  { params: { id: number }}) {
  return {
    title: 'Detail of a pokemon order: ' + params.id,
  }
}
export default async function PokemonDetailsSSR({ params }: { params: { id: number } }) {
  const pokemon: Pokemon = await getDataById(params.id);
  const id = params?.id as number;
  return (
    <div className="container w-1/2 m-auto rounded border">
      <div className="flex justify-evenly items-center m-6">
        <div>
          <h1>Weight: {pokemon.weight}</h1>
          <h1>Height: {pokemon.height}</h1>
        </div>
        <Image
          src={pokemon.sprites.other.showdown.front_default}
          alt={`Image de ${pokemon.name}`}
          width={100}
          height={100}
        />
      </div>
      <div>
      </div>
      <div className='flex justify-evenly items-center'>
        <div>
          <h1>{pokemon.name}</h1>
          <p >Base experience: {pokemon.base_experience}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Abilités</h2>
          <ul className="flex flex-col space-y-1">
            {pokemon.abilities.map((abilityInfo, index) => (
              <li key={index}>{abilityInfo.ability.name} (Slot {abilityInfo.slot}, {abilityInfo.is_hidden ? 'caché' : 'visible'})</li>
            ))}
          </ul>
        </div>
        <div>
          <ul className='flex flex-col space-y-1'>
            {pokemon.types.map((type, index) => (
              <li key={index}>{type.type.name} (Slot {type.slot})</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-evenly items-center mb-2 mt-7">
        <Link href={`/server`} className='px-4 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-center font-serif'>view pokemons</Link>
      </div>
    </div>
  );
}
