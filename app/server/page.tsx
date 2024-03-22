import React from 'react';
import { ResponsePokemon } from "../types/type";
import Image from "next/image";
import { getData } from "../services/fetch";
import Link from 'next/link';

export default async function ListPokemonSSR() {
  const finalData: ResponsePokemon[] = await getData();

  return (
    <div className='flex flex-row flex-wrap justify-evenly'>
      {finalData.map((pokemon, index) => (
        <div key={index} className="w-64 p-5  shadow-slate-100">
          <div>
            <Image
              src={pokemon.details[0].sprites.other.showdown.front_default}
              alt={pokemon.details[0].name}
              width={50}
              height={50}
            />
            <div>
              <h6>
                {pokemon.details[0].name}
              </h6>
              <h2>
                Base Experience: {pokemon.details[0].base_experience}
              </h2>
              <div className='flex items-center '>
                <Link className='px-2 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-sm text-center font-serif' href={`/server/${pokemon.details[0].order}`}>View Details</Link>
              </div>
            </div>
          </div>

        </div>
      ))}
      <div className='flex items-center py-7'>
        <Link className='px-2 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-sm text-center font-serif' href={`/client`}>View CSR</Link>
      </div>
    </div>
  );
}

