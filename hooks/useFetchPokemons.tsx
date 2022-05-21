import type {PokemonUrl} from '../pages/index'

export async function fetchPokemonUrls() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200');
  return res.json();
}

export async function fetchPokemonData(pokemonUrls: PokemonUrl[]) {
    const pokemonList = [];
    for await (const pokemon of pokemonUrls) {
      const res2 = await fetch(pokemon.url);
      const data2 = await res2.json();
      pokemonList.push(data2)
    }
    return pokemonList
  }
  