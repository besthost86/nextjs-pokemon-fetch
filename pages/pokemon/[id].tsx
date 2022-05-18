import React, {useEffect, useState} from 'react'
import usePokemonContext from '../../context/PokemonContext';
import { statColors } from '../../context/PokemonContext';
import {useRouter} from 'next/router'
import type {PokemonDetails} from '../index'
import styles from  '../../styles/Pokemonstats.module.css'

export default function PokemonStats() {
  const [pokemons, setPokemons] = usePokemonContext()
  const [pokemon, setPokemon] = useState<PokemonDetails>();
  const router = useRouter();
  
  
  useEffect(() => {
    if (!router.isReady) return 
    setPokemon(pokemons.find(p => p.id === parseInt(router.query.id as string)))
    
    async function fetchWebIfNoPokemon() {

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.id}`);
      const data = await res.json();
      data && setPokemon(data);
    }
    if (!pokemons.length) {
      fetchWebIfNoPokemon();
    }
  },[pokemons, router.isReady]);


  return pokemon ? (
    <div className={styles.container}>
         <img src={pokemon.sprites.other["official-artwork"]["front_default"]} alt={`Pokemon ${pokemon.name}`} />
         <h1>{pokemon.name}</h1>
        <div>{pokemon.stats.map((st, index) => <div className={styles.static} style={{'--progressWidth': `${st.base_stat*100/150}%`} as React.CSSProperties} key={index}><div  className={styles.progress} style={{backgroundColor: statColors[index]}}></div><p  className={styles.stat}>{st.stat.name} - {st.base_stat} </p></div>)}</div>
    </div>
  )
    : null  
  
}
