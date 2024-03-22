"use client";

import { getDataById } from "@/app/services/fetch";
import { Pokemon } from "@/app/types/type";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PokemonDetailsCSR() {
  const [pokemon, setPokemon] = useState<Pokemon| null>(null)
  const { id } = useParams(); 
  const fetchPokemon = async () => {
    try {
      let pokemonId: number;
      if (typeof id === "string") {
        pokemonId = parseInt(id, 10);
      } else {
        pokemonId = parseInt(id[0], 10);
      }
      const data = await getDataById(pokemonId);
      setPokemon(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPokemon()
  }, [])
  
  return (pokemon != null && (
    <div className="container w-1/2 m-auto rounded border">
      <div className="flex justify-evenly items-center m-6">
        <div>
          <h1 className="">Weight: {pokemon.weight}</h1>
          <h1 className="">Height: {pokemon.height}</h1>
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
          <h1 className="">{pokemon.name}</h1>
          <p className=''>Base experience: {pokemon.base_experience}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Abilités</h2>
          <ul className="flex flex-col space-y-1">
            {pokemon.abilities.map((abilityInfo, index) => (
              <li key={index} className=''>{abilityInfo.ability.name} (Slot {abilityInfo.slot}, {abilityInfo.is_hidden ? 'caché' : 'visible'})</li>
            ))}
          </ul>
        </div>
        <div>
          <ul className='flex flex-col space-y-1'>
            {pokemon.types.map((type, index) => (
              <li key={index} className=''>{type.type.name} (Slot {type.slot})</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-evenly items-center mb-2 mt-7">
        <Link href={`/client`} className='px-4 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-center font-serif'>view pokemons</Link>
      </div>
    </div>
  ))
}
