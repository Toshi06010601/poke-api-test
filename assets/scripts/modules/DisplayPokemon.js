import { addNewPokemon } from "./database/pokemonService";
import { GetPokemonSpecies, GetPokemonEvolutionChain } from "./HttpRequest";

// When showing individual pokemon data
export const getInputName = (e) => {
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

export const autoPlayCry = (data) => {
  const crySound = new Audio(data.cry);

  setTimeout(() => {
  crySound.play();
  }, 500);
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

export const getEvolvesToName = async (pokemonName) => {
  let pokemonEvolutionChain = null;

  const pokemonSpecies = await GetPokemonSpecies(pokemonName);

  // If evolution chain exists, get evolution chain's url
  if(pokemonSpecies.evolution_chain != null) {
    const url = pokemonSpecies.evolution_chain.url.replace("https://pokeapi.co/api/v2/", "");
    pokemonEvolutionChain = await GetPokemonEvolutionChain(url);
  }

  let evolvesToName = null;
  if (pokemonEvolutionChain.chain.evolves_to != null) {
    if(pokemonName === pokemonEvolutionChain.chain.species.name) {
      evolvesToName = pokemonEvolutionChain.chain.evolves_to[0].species.name;
    } else {
      evolvesToName = pokemonEvolutionChain.chain.evolves_to[0].evolves_to[0].species.name;
    }
  }

  return evolvesToName;
}