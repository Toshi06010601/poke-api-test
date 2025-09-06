import '../styles/style.css';
import { getPokemonData } from './modules/HttpRequest';
import { extractData, showData, autoPlayCry} from './modules/PokemonData';

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