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
  const htmlData = `<dl>
    <dt>Name: ${data.name}</dt>
    <dd><img src="${data.img}" alt="" class="pokemonImg"></dd>
    <dd>ID: ${data.id}</dd>
    <dt>Types: ${data.types.join(", ")}</dt>
  </dl>`
  document.querySelector("#js-result")
  .innerHTML = htmlData
}

export const autoPlayCry = (data) => {
  const crySound = new Audio(data.cry);

  setTimeout(() => {
  crySound.play();
  }, 500);
}