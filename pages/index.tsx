import { useEffect, useLayoutEffect ,useState}  from 'react'
import {fetchPokemonUrls, fetchPokemonData} from '../hooks/useFetchPokemons'
import usePokemonContext from '../context/PokemonContext'
import type {ContextValueType} from '../context/PokemonContext'
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export interface PokemonUrl {
  name: string, 
  url: string
}
export interface PokemonDetails extends PokemonUrl {
  id: number;
  stats: any[];
  sprites: {
    other: any
  }
}
interface propsType {
  pokemons: PokemonDetails[]
}


const Home: NextPage<propsType> =  ({pokemons}) => {
  const [globalPokemons, setGlobalPokemons] = usePokemonContext();

  useEffect(() => {
    setGlobalPokemons(pokemons);
  });
  return (
    <div className={styles.container}>
     {pokemons.map((pokemon, index) => (
       <Link href={`/pokemon/${pokemon.id}`} key={index}>
        <div className={styles["pokemon-card"]}>
       <img src={pokemon.sprites.other["official-artwork"]["front_default"]} alt={`Pokemon ${pokemon.name}`} />
       <p>{pokemon.name}</p>
       </div>
       </Link>
      ))}
    </div>
  )
}

interface SSRparams {
  req: any;
  res: any
}


export async function getServerSideProps({req, res}: SSRparams) {
  try {
   res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
   const data = await fetchPokemonUrls();
   const pokemons = await fetchPokemonData(data.results)
   return {
     props: {pokemons}
   }
  }
  catch(err) {
    if (typeof err === 'string')
    throw new Error(err)
  }
}

export default Home
