// Show suggestions that match user's input
export const getMatchingPokemons = (pokemons, currentInput) => {
  const matchedPokeNames = pokemons.filter(pokemon => pokemon.name.startsWith(currentInput));
  const firstFiveMatches = matchedPokeNames.slice(0, 5);
  return firstFiveMatches;
}

export const showSuggestions = (pokeNames) => {
  let htmlData = "";
  const numOfPokes = Object.keys(pokeNames).length;
  for(let i = 0; i < numOfPokes; i++){
    htmlData += `<div class="suggestion">${pokeNames[i].name}</div>`;
  }
  document.querySelector("#js-result").innerHTML = htmlData;

  document.querySelectorAll(".suggestion").forEach(suggestion => {
  suggestion.addEventListener("click", (e) => {
    const $button = document.querySelector("#js-button");
    const $inputField = document.querySelector("#js-input");
    $inputField.value = e.target.textContent;
    $button.click();
  })
  })

}


// Show individual pokemon data
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
  const htmlData = `<dl>
    <dt>Name: ${data.name}</dt>
    <dd><img src="${data.img}" alt=""></dd>
    <dd>ID: ${data.id}</dd>
    <dt>Types: ${data.types.join(", ")}</dt>
  </dl>`
  document.querySelector("#js-result")
  .innerHTML = htmlData
}

export const autoPlayCry = (data) => {
  const crySound = new Audio(data.cry);
  crySound.play();
}