"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ResponsePokemon } from "../types/type";
import { getData } from '../services/fetch';
import Link from 'next/link';


export default function ListPokemonCSR() {
  const [finalData, setFinalData] = useState<ResponsePokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setFinalData(data);
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-row flex-wrap justify-evenly'>
      {finalData.map((pokemon, index) => (
        <div key={index}>
          <div className="w-64 p-5">
            <Image
              src={pokemon.details[0].sprites.other.showdown.front_default}
              alt={pokemon.details[0].name}
              width={50}
              height={50}
            />
            <div>
              <h5>
                {pokemon.details[0].name}
              </h5>
              <h5>
                Base Experience: {pokemon.details[0].base_experience}
              </h5>
            </div>
            <div>
              <Link href={`/server/${pokemon.details[0].order}`}>View Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
