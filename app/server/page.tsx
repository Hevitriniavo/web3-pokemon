import { Card } from "@mui/material";
import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Pokemon, PokemonResult, ResponsePokemon } from "../types/type";
import Image from "next/image";

export async function getData(): Promise<ResponsePokemon[]> {
    const finalData: ResponsePokemon[] = [];

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const data = await response.json();

    await Promise.all(data.results.map(async (pokemon: PokemonResult) => {
        const response = await fetch(pokemon.url);
        const pokemonDetail = await response.json();
        finalData.push({ name: pokemon.name, details: [pokemonDetail] });
    }));

    return finalData;
}


export default async function ListPokemon() {
 const finalData: ResponsePokemon[] = await getData();

 return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {finalData.map((pokemon, index) => (
        <Card key={index} sx={{ maxWidth: 345, margin: 2 }}>
         <Image
            src={pokemon.details[0].sprites.front_default}
            alt={pokemon.details[0].name}
            width={200}
            height={200}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pokemon.details[0].name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Base Experience: {pokemon.details[0].base_experience}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View Details</Button>
          </CardActions>
        </Card>
      ))}
    </div>
 );
}

