import {fetchPokemonUrls, fetchPokemonData} from '../hooks/useFetchPokemons'
import {useState} from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

export interface PokemonUrl {
  name: string, 
  url: string
}

interface propsType {
  pokemons: PokemonUrl[]
}


const Home: NextPage<propsType> =  ({pokemons}) => {
  

const [matches, setMatches] = useState<PokemonUrl[] | "">([]);

  const searchPokemons = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const filter = e.target.value && pokemons.filter(p => p.name.startsWith(e.target.value) )
    setMatches(filter);
  }

  return (
    <div className={styles.container}>
      <img src="/logo.png" alt="pokemon logo" />
      <input type="text" placeholder="...search" onChange={(e) => searchPokemons(e)}/>
      <div className={styles.results}> { matches ? matches.map((match: PokemonUrl, index: number) => ( 
        <Link key={index} href={`/pokemon/${match.name}`}>
          <div  className={styles.result}>
            <img style={{width: '80px'}} src="/Pokeball.svg" alt="pokemon ball" />
            <p>{match.name}</p> 
        </div> 
        </Link> )) : undefined}
       </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
   const data = await fetchPokemonUrls();
   return {
     props: {pokemons: data.results}
   }
  }
  catch(err) {
    if (typeof err === 'string')
    throw new Error(err)
  }
}

export default Home
