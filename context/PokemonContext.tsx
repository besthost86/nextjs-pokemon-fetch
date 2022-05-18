import React,{ createContext, useContext, useState }  from "react";
import type {PokemonDetails} from '../pages/index'

export const Context = createContext<ContextValueType>([[], () => {}]);

export type ContextValueType = [PokemonDetails[], React.Dispatch<React.SetStateAction<PokemonDetails[]>>]
type PokemonProviderProps = {
    children: any
}
export const PokemonContextProvider = ({children}: PokemonProviderProps) => {
    const [globalPokemons, setGlobalPokemons] = useState<any[]>([])
    return <Context.Provider value={[globalPokemons, setGlobalPokemons]}>{children}</Context.Provider>  
}

export default function usePokemonContext() {
    return useContext(Context)
}


export const statColors = ['rgba(247, 255, 92, 0.5)','rgba(255, 165, 0, 0.5)', 'rgba(255, 116, 92, 0.5)', 'rgba(50, 168, 82, 0.5)', 'rgba(92, 173, 255, 0.5)', 'rgba(145, 83, 176, 0.5)']
