// Store the all pokemons' data in local storage
export const cachePokeNamesInLocal = (data) => {
  localStorage.setItem("PokeNames", JSON.stringify(data));
}

// Get all pokemons' data from local storage
export const getPokeNamesFromLocal = () => {
  const pokeNames = localStorage.getItem("PokeNames");
  return JSON.parse(pokeNames);
}