import '../styles/style.css';
import { getPokemonData, getAllPokeNames, getAllTypes , getPokemonsForEachType } from './modules/HttpRequest';
import { retrieveApiResponseFromLocal, cacheApiResponseInLocal} from './modules/LocalStorage';
import { getMatchingPokemons, showSuggestions, setTypesInCombobox} from './modules/SuggestPokemons';
import { extractData, showData, playCry, zoomIn, captureNewPokemon, getEvolvesToName, getCurrentInput } from './modules/DisplayPokemon';
import { fetchCapturedPokemons } from './modules/database/pokemonService';
import { showCapturedPokemons, setReleasePokemonAction, setPlayCryOnClick, setEvolvePokemonAction } from './modules/ListCapturedPokemons';

// Initialize process
document.addEventListener("DOMContentLoaded", async () => {
  // Cache all types if not cached yet
  if(localStorage.getItem("Types") === null) {
    const types = await getAllTypes();
    cacheApiResponseInLocal(types.results, "Types");
  }

  // Cache all pokemon names if not caches yet
  if(localStorage.getItem("all") === null) {
    const response = await getAllPokeNames();
    const allPokeNames = response.results.map(pokeName => ({ pokemon: pokeName })); // Make the object structure same as other types 
    cacheApiResponseInLocal(allPokeNames, "all");
  }

  // Cache pokemons names for each type if not cached yet
  const allTypes = retrieveApiResponseFromLocal("Types");
  allTypes.forEach(async (type) => {
    if(localStorage.getItem(type.name) === null) {
      const pokesForEachType = await getPokemonsForEachType(type.name);
      cacheApiResponseInLocal(pokesForEachType.pokemon, type.name);
    }
  });

  // Set types in combobox
  setTypesInCombobox([{name: "all"}, ...allTypes]);

  // Show captured pokemons with cry and release functionalities
  const querySnapshot = await fetchCapturedPokemons();
  await showCapturedPokemons(querySnapshot);
  setPlayCryOnClick();
  await setReleasePokemonAction();
  await setEvolvePokemonAction();
});



// Show suggestion as user types in search field
const $inputField = document.querySelector('input[name="pokeName"]');
const $typeSelector = document.querySelector('#js-types');
const suggestMatchingPokemonNames = () => {
  const currentInput = $inputField.value.toLowerCase();
  const currentType = $typeSelector.value;
  const pokemonListOfEachType = retrieveApiResponseFromLocal(currentType);
  const matchedPokemons = getMatchingPokemons(pokemonListOfEachType, currentInput);
  showSuggestions(matchedPokemons);
}
$inputField.addEventListener("input", suggestMatchingPokemonNames);
$typeSelector.addEventListener("change", suggestMatchingPokemonNames);


// Display the selected pokemon
const submitHandler = async (e) => {
  e.preventDefault();
  const currentInput = getCurrentInput(e);
  const pokemonData = await getPokemonData(currentInput.toLowerCase());
  const pokemonDataToShow = extractData(pokemonData)
  showData(pokemonDataToShow);
  playCry(pokemonDataToShow);

  // Set eventListener to capture the pokemon upon click
  document.querySelector("#js-capture").addEventListener("submit", async (e) => {
    e.preventDefault();
    const evolvesTo = await getEvolvesToName(pokemonData.name);
    await captureNewPokemon(e, evolvesTo);
  });
}

// Set eventlistener to display the selected pokemon
document.querySelector("#js-form").addEventListener("submit", async (e) => {
  await submitHandler(e);
  zoomIn(".pokemonImg");
});