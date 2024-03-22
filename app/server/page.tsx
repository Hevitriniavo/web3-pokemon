import { Card } from "@mui/material";
import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ResponsePokemon } from "../types/type";
import Image from "next/image";
import { getData } from "../services/fetch";

export default async function ListPokemon() {
 const finalData: ResponsePokemon[] = await getData();

 return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {finalData.map((pokemon, index) => (
       <div key={index}>
        <Card  sx={{ maxWidth: 345, margin: 2 }}>
         <Image
            src={pokemon.details.sprites.front_default}
            alt={pokemon.details.name}
            width={200}
            height={200}
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
            <Button size="small">View Details</Button>
          </CardActions>
        </Card>
       
       </div>
      ))}
     
    </div>
 );
}

