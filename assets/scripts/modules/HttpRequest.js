import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 1000,
});

// instance
export const getPokemonData = async (pokeName) => {
  try {
    const response = await instance.get("pokemon/" + pokeName); //fixed
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Pokemon not found");
  }
}

export const getAllPokeNames = async () => {
  try {
    const response = await instance.get("pokemon/?limit=10000"); //fixed
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Failed to load pokemons' data");
  }
}

export const getAllTypes = async () => {
  try {
    const response = await instance.get("type");
    return response.data;
  } catch (error) {
    console.error(error);
    alert("Failed to load pokemon types");
  }
}

export const getPokemonsForEachType = async (type) => {
    try {
      const response = await instance.get(`type/${type}`);
      return response.data;
    } catch (error) {
      console.error(error);
      alert("Failed to load pokemons with the selected type");
    }
}

export const GetPokemonSpecies = async (id) => {
    try {
      const response = await instance.get(`pokemon-species/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      alert(`Failed to load pokemon species for pokemon id: ${id}`);
    }
}

export const GetPokemonEvolutionChain = async (url) => {
    try {

      const response = await instance.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      alert(`Failed to load pokemon evolution for evolution chain id: ${chainId}`);
    }
}
