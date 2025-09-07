import '../styles/style.css';
import { getPokemonData, getAllPokeNames } from './modules/HttpRequest';
import { getPokeNamesFromLocal, cachePokeNamesInLocal} from './modules/LocalStorage';
import { getMatchingPokemons, showSuggestions} from './modules/SuggestPokemons';
import { getInputName, extractData, showData, autoPlayCry } from './modules/DisplayPokemon';

// Store Pokemon names in local storage
document.addEventListener("DOMContentLoaded", async () => {
  const pokeNames = await getAllPokeNames();
  cachePokeNamesInLocal(pokeNames.results);
});

// Show suggestion as user types in search field
document.querySelector('input[name="pokeName"]')
.addEventListener("input", (e) => {
  const pokeNames = getPokeNamesFromLocal();
  const currentInput = e.target.value;
  const matchedPokemons = getMatchingPokemons(pokeNames, currentInput);
  showSuggestions(matchedPokemons);
});

// Display the selected pokemon
const submitHandler = async (e) => {
  e.preventDefault();
  const inputName = getInputName(e);
  const pokemonData = await getPokemonData(inputName);
  const extractedData = extractData(pokemonData)
  showData(extractedData);
  autoPlayCry(extractedData);
}
document.querySelector("#js-form").addEventListener("submit", (e) => submitHandler(e));