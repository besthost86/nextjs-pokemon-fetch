import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {PokemonContextProvider} from '../context/PokemonContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PokemonContextProvider>
    <Component {...pageProps} />
    </PokemonContextProvider>
  ) 
}

export default MyApp
