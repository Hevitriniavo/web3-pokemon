import React from 'react';
import { getDataById } from "@/app/services/fetch";
import { Pokemon } from '@/app/types/type';
import Image from 'next/image';

export default async function PokemonDetailsSSR({ params }: { params: { id: number } }) {
  const pokemon: Pokemon = await getDataById(params.id);
  console.log(pokemon);

  return (
    <div className="m-6 rounded border border-red-300">
      <div className="flex justify-center items-center">
        <Image
          src={pokemon.sprites.other.showdown.front_default}
          alt={`Image de ${pokemon.name}`}
          width={100}
          height={100}
        />
      </div>
      <div className='flex justify-evenly items-center'>
        <div>
          <h1 className="">{pokemon.name}</h1>
          <p className=''>Expérience de base: {pokemon.base_experience}</p>
          <p className=''>Hauteur: {pokemon.height}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Abilités</h2>
          <ul className="flex flex-col space-y-1">
            {pokemon.abilities.map((abilityInfo, index) => (
              <li key={index} className=''>{abilityInfo.ability.name} (Slot {abilityInfo.slot}, {abilityInfo.is_hidden ? 'caché' : 'visible'})</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
