"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { ResponsePokemon } from "../types/type";
import PokemonDetails from '../components/PokemonDetails';
import { getData } from '../services/fetch';



export default function ListPokemon() {
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
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {finalData.map((pokemon, index) => (
        <div key={index}>
          <Card sx={{ maxWidth: 345, margin: 2 }}>
            <Image
              src={pokemon.details.sprites.front_default}
              alt={pokemon.details.name}
              width={200}
              height={200}
              objectFit="cover"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {pokemon.details.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Base Experience: {pokemon.details.base_experience}
              </Typography>
            </CardContent>
            <CardActions>
              <button onClick={() => toggleModal(pokemon)}>View Details</button>
            </CardActions>
          </Card>
        </div>
      ))}
      <PokemonDetails selectedPokemon={selectedPokemon} open={open} setOpen={setOpen} />
    </div>
  );
}
