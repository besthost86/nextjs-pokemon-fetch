import { statColors } from '../../store/PokemonContext'; 
import type {PokemonDetails} from '../index'
import styles from  '../../styles/Pokemonstats.module.css'

export default function PokemonStats({pokemon} : {pokemon: PokemonDetails}) {

  
  return pokemon ? (
    <div className={styles.container}>
         <img src={pokemon.sprites.other["official-artwork"]["front_default"]} alt={`Pokemon ${pokemon.name}`} />
         <h1>{pokemon.name}</h1>
        <div>{pokemon.stats.map((st, index) => <div className={styles.static} style={{'--progressWidth': `${st.base_stat*100/150}%`} as React.CSSProperties} key={index}><div  className={styles.progress} style={{backgroundColor: statColors[index]}}></div><p  className={styles.stat}>{st.stat.name} - {st.base_stat} </p></div>)}</div>
    </div>
  )
    : null  
  
}

interface SSRProps {
  req: any;
  res: any;
  params: {
    id: string
  }
}

export async function getServerSideProps({req, res, params: {id}}: SSRProps) {
  res.setHeader('Cache-Control', 'public, max-age=100000, stale-while-revalidate=59');
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return {
    props: {
      pokemon: data
    }
  }
}