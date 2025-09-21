import { addNewPokemon } from "./database/pokemonService";
import { GetPokemonSpecies, GetPokemonEvolutionChain } from "./HttpRequest";

// When showing individual pokemon data
export const getCurrentInput = (e) => {
  const form = new FormData(e.target);
  const pokeName = form.get("pokeName").toLowerCase();
  return pokeName;
}

export const extractData = (pokemonData) => {
  const id = pokemonData.id;
  const name = pokemonData.name;
  const img = pokemonData.sprites.front_default
  const types = [];
  pokemonData.types.forEach(typeItem => {
    types.push(typeItem.type.name);
  });
  const cry = pokemonData.cries.latest;
  return {id, name, img, types, cry}
}

export const showData = (data) => {
  const htmlData = `
  <dl>
    <dt>Name: ${data.name}</dt>
    <dd class="imgFrame"><img src="${data.img}" alt="" class="pokemonImg"></dd>
    <dd>ID: ${data.id}</dd>
    <dt>Types: ${data.types.join(", ")}</dt>
  </dl>
  <form action="" method="post" id="js-capture">
    <input type="hidden" name="name" value="${data.name}">
    <input type="hidden" name="img" value="${data.img}">
    <input type="hidden" name="cry" value="${data.cry}">
    <button type="submit" class="pokeball"></button>
  </form>`
  document.querySelector("#js-result")
  .innerHTML = htmlData
}

export const playCry = (data) => {
  const crySound = new Audio(data.cry);

  setTimeout(() => {
  crySound.play();
  }, 500);
}

// Add zoom-in effect to the pokemon image 
export const zoomIn = (el) => {
  const pokemonImg = document.querySelector(el);
  pokemonImg.addEventListener("load", () => {
    setTimeout(() => {
      pokemonImg.classList.toggle("zoom-in");
    }, 500);
  });
}

export const captureNewPokemon = async (e, evolvesTo) => {
  const formData = new FormData(e.target);

  // Check if it has been already captured
  const capturedPokemons = document.querySelectorAll(".captured-pokemon");
  const samePokemon = [...capturedPokemons].filter(pokemon => formData.get("name") === pokemon.textContent);

  // Add the pokemon if not captured yet
  if(samePokemon.length === 0) {
      await addNewPokemon(formData.get("name"), formData.get("img"), formData.get("cry"), evolvesTo);
      location.reload();
  } else {
    alert(`${formData.get("name")} was already captured in the past`);
  }

}

const findEvolvesToName = (evolutionChain, pokemonName) => {
  if(evolutionChain.species.name === pokemonName) {
    // Return evolved pokemon if exists, return the current pokemon if not exists
    const randomNum = Math.floor(Math.random() * (evolutionChain.evolves_to.length));
    return evolutionChain.evolves_to.length > 0 ? evolutionChain.evolves_to[randomNum].species.name : evolutionChain.species.name ;
  } else {

    // Call itself until if find the same pokemon
    for (let i = 0; i < evolutionChain.evolves_to.length; i++) {
      const result = findEvolvesToName(evolutionChain.evolves_to[i], pokemonName);
      if (result != null) return result;
    }
  }
}

export const getEvolvesToName = async (pokemonName) => {
  // Exceptional case: Return if pokemon name contains "mega" since there is no species info
  if (pokemonName.toLowerCase().includes("mega")) {
    return pokemonName;
  }

  // Get the pokemon's evolution chain
  const pokemonSpecies = await GetPokemonSpecies(pokemonName);
  const evolutionChainUrl = pokemonSpecies.evolution_chain.url.replace("https://pokeapi.co/api/v2/", "");
  const pokemonEvolutionChain = await GetPokemonEvolutionChain(evolutionChainUrl);

  return findEvolvesToName(pokemonEvolutionChain.chain, pokemonName);
}