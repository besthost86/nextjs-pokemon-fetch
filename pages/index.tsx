import { useEffect, useState}  from 'react'
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

const Home: NextPage =  () => {

  const [pokemonUrls, setPokemonUrls] = useState<PokemonUrl[]>([]);
  const [pokemons, setPokemons]: ContextValueType = usePokemonContext()

  useEffect(  () => {
    fetchPokemonUrls().then(data => setPokemonUrls(data.results) );
  },[]);

  useEffect(() => {
    if (pokemonUrls) fetchPokemonData(pokemonUrls).then(data => setPokemons(data))
  
  },[pokemonUrls]);
  return (
    pokemons.length ?
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
    : null
  )
}




export default Home


