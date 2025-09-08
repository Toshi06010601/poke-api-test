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


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_I,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);