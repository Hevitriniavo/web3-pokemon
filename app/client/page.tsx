"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { ResponsePokemon } from "../types/type";
import PokemonDetails from '../components/PokemonDetails';
import { getData } from '../services/fetch';


export default function ListPokemonCSR() {
  const [finalData, setFinalData] = useState<ResponsePokemon[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<ResponsePokemon | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setFinalData(data);
    };

    fetchData();
  }, []);

  const toggleModal = (pokemon: ResponsePokemon) => {
    setSelectedPokemon(pokemon)
    setOpen(!open)
  }

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
              <button onClick={() => toggleModal(pokemon)}>View Details</button>
            </div>
          </div>
        </div>
      ))}
      <PokemonDetails selectedPokemon={selectedPokemon} open={open} setOpen={setOpen} />
    </div>
  );
}
