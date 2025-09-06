import '../styles/style.css';
import { getPokemonData, getAllPokeNames } from './modules/HttpRequest';
import { getPokeNamesFromLocal, cachePokeNamesInLocal} from './modules/LocalStorage';
import { extractData, showData, autoPlayCry, getMatchingPokemons, showSuggestions} from './modules/PokemonData';

// Initial setup for Name search
document.addEventListener("DOMContentLoaded", async () => {
  const pokeNames = await getAllPokeNames();
  cachePokeNamesInLocal(pokeNames.results);
});

// Show suggestion as user types each letter in search field
document.querySelector("#js-input").addEventListener("input", (e) => {
  const pokeNames = getPokeNamesFromLocal();
  const currentInput = e.target.value;
  const matchedPokemons = getMatchingPokemons(pokeNames, currentInput);
  showSuggestions(matchedPokemons);
})


const getInputName = (e) => {
  const form = new FormData(e.target);
  const pokeName = form.get("pokeName").toLowerCase();
  return pokeName;
}

const submitHandler = async (e) => {
  e.preventDefault();
  const inputName = getInputName(e);
  const pokemonData = await getPokemonData(inputName);
  const extractedData = extractData(pokemonData)
  showData(extractedData);
  autoPlayCry(extractedData);
}

document.querySelector("#js-form").addEventListener("submit", (e) => submitHandler(e));