"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ResponsePokemon } from "../types/type";
import { getData } from '../services/fetch';
import Link from 'next/link';
import { Pagination } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function ListPokemonCSR() {
  const [finalData, setFinalData] = useState<ResponsePokemon[]>([]);
  const [initialPage, setInitialPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getData(`https://pokeapi.co/api/v2/pokemon/?offset=${initialPage}&limit=50`);
      setFinalData(data);
      setLoading(false);
    };

    fetchData();
  }, [initialPage]);

  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setInitialPage(value);
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <header>
            <h1 className="text-3xl font-bold text-center">List of Pokemons (CSR)</h1>
          </header>
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
                    <Link className='px-2 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-sm text-center font-serif' href={`/server/${pokemon.details[0].order}`}>View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex items-center justify-center py-7'>
            <Link className='px-2 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-sm text-center font-serif' href={`/server`}>View SSR</Link>
          </div>
          <div className='flex items-center justify-center py-7'>
            <Pagination
              count={50}
              page={initialPage}
              onChange={changePage}
              color="primary"
            />
          </div>
        </div>
      )}
    </div>
  );
}
