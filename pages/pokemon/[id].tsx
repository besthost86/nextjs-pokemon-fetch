import { statColors } from '../../store/PokemonContext'; 
import Image from 'next/image'
import styles from  '../../styles/Pokemonstats.module.css'


interface PokemonDetails {
    stats: {
      base_stat: any,
      stat: any }[]
    name: string,
    sprites: any
}


export default function PokemonStats({pokemon} : {pokemon: PokemonDetails}) {

  return pokemon ? (
    <div className={styles.container}>
      <Image src={pokemon.sprites.other["official-artwork"]["front_default"]} 
      alt={`Pokemon ${pokemon.name}`}
      width='500px' height='500px'/>
         <h1>{pokemon.name}</h1>
        <div>{pokemon.stats.map((st, index) => <div key={index} className={styles.static} style={{'--progressWidth': `${st.base_stat*100/150}%`} as React.CSSProperties} ><div  className={styles.progress} style={{backgroundColor: statColors[index]}}></div><p  className={styles.stat}>{st.stat.name} - {st.base_stat} </p></div>)}</div>
    </div>
  )
    : null  
  
}

interface SSRProps {
  params: {
    id: string
  }
}

export async function getServerSideProps({params: {id}}: SSRProps) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return {
    props: {
      pokemon: data
    }
  }
}
