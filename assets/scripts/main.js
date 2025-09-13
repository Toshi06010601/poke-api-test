import '../styles/style.css';
import { getPokemonData, getAllPokeNames } from './modules/HttpRequest';
import { getPokeNamesFromLocal, cachePokeNamesInLocal} from './modules/LocalStorage';
import { getMatchingPokemons, showSuggestions} from './modules/SuggestPokemons';
import { getInputName, extractData, showData, autoPlayCry } from './modules/DisplayPokemon';
import { showCapturedData, captureNewPokemon, releasePokemon } from './modules/database/pokemonService';

// Store all Pokemon names in local storage
document.addEventListener("DOMContentLoaded", async () => {
  const pokeNames = await getAllPokeNames();
  cachePokeNamesInLocal(pokeNames.results);
  await showCapturedData();
  const releaseBtns = document.querySelectorAll(".release-btn");
      if(releaseBtns.length > 0) {
        releaseBtns.forEach(Btn => {
          Btn.addEventListener("click", (e) => {
            releasePokemon(e);
          })
        })

      }

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

  // Add the pokemon to the database when the capture button clicked
  document.querySelector("#js-capture").addEventListener("submit", (e) => {
    captureNewPokemon(e);
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