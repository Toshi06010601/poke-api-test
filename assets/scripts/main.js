import '../styles/style.css';
import { getPokemonData, getAllPokeNames, getAllTypes , getPokemonsForEachType } from './modules/HttpRequest';
import { retrieveApiResponseFromLocal, cacheApiResponseInLocal} from './modules/LocalStorage';
import { getMatchingPokemons, showSuggestions, setTypesInCombobox} from './modules/SuggestPokemons';
import { getInputName, extractData, showData, autoPlayCry, captureNewPokemon } from './modules/DisplayPokemon';
import { fetchCapturedPokemons } from './modules/database/pokemonService';
import { showCapturedPokemons, releasePokemon, playCryOnClick } from './modules/ListCapturedPokemons';

// Initialize process
document.addEventListener("DOMContentLoaded", async () => {
  // Store poke names and types in local storage

  // Set types in combobox
  if(localStorage.getItem("Types") === null) {
    const types = await getAllTypes();
    cacheApiResponseInLocal(types.results, "Types");
  }
  const allTypes = retrieveApiResponseFromLocal("Types");
  setTypesInCombobox([{name: "all"}, ...allTypes]);

  // Cache all pokemon names 
  const response = await getAllPokeNames();
  const allPokeNames = response.results.map(pokeName => ({ pokemon: pokeName })); // Make the object structure same as other types 
  cacheApiResponseInLocal(allPokeNames, "all");

  // Cache pokemons names for each type
  allTypes.forEach(async (type) => {
    if(localStorage.getItem(type.name) === null) {
      const pokesForEachType = await getPokemonsForEachType(type.name);
      cacheApiResponseInLocal(pokesForEachType.pokemon, type.name);
    }
  });

  // Show captured pokemons with cry and release functionalities
  const querySnapshot = await fetchCapturedPokemons();
  await showCapturedPokemons(querySnapshot);
  playCryOnClick();
  await releasePokemon();
});

// Show suggestion as user types in search field
document.querySelector('input[name="pokeName"]')
.addEventListener("input", (e) => {
  const currentInput = e.target.value;
  const currentType = document.querySelector("#js-types").value;
  const pokeNames = retrieveApiResponseFromLocal(currentType);
  const matchedPokemons = getMatchingPokemons(pokeNames, currentInput);
  showSuggestions(matchedPokemons);
});

// Show suggestion as user types in search field
document.querySelector('#js-types')
.addEventListener("change", (e) => {
  const currentInput = document.querySelector('input[name="pokeName"]').value;
  const currentType = document.querySelector("#js-types").value;
  const pokeNames = retrieveApiResponseFromLocal(currentType);
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

  // If pokeball is clicked, capture the pokemon
  document.querySelector("#js-capture").addEventListener("submit", async (e) => {
    await captureNewPokemon(e);
  });
}

document.querySelector("#js-form").addEventListener("submit", async (e) => {
  await submitHandler(e);

  // Add zoom-in effect to the pokemon image 
  const pokemonImg = document.querySelector(".pokemonImg");
  pokemonImg.addEventListener("load", () => {
    setTimeout(() => {
      pokemonImg.classList.toggle("zoom-in");
    }, 500);
  });
});