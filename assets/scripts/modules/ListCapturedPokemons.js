import { deletePokemon, updatePokemon } from "./database/pokemonService";
import { getPokemonData } from "./HttpRequest";
import { getEvolvesToName } from "./DisplayPokemon";

export const showCapturedPokemons = (querySnapshot) => {
  let htmlData = '';
  querySnapshot.forEach((doc) => {
    htmlData += 
    `<div class="captured-item"><dl>
      <dt><img src="${doc.data().img}" alt="" data-cry="${doc.data().cry}"></dt>
      <dd class="captured-pokemon">${doc.data().name}</dd>
    </dl>
    <button data-id="${doc.id}" class="release-btn"></button>
    <button data-id="${doc.id}" data-evolves_to_name="${doc.data().evolvesTo}" class="evolve-btn" style="display:${doc.data().name === doc.data().evolvesTo && 'none'}">Evolve</button>
    </div>`;
  });

  document.querySelector("#js-captured").innerHTML = htmlData;
}

// Add eventlistener to play cry upon click
export const playCryOnClick = () => {
  document.querySelectorAll(".captured-item img").forEach((img)=> {
    img.addEventListener("click", (e) => {
      const crySound = new Audio(e.target.dataset.cry);
      crySound.play();
    })
  })
}

// Add eventlistener to delete pokemon upon click
export const releasePokemon = () => {
const releaseBtns = document.querySelectorAll(".release-btn");
if(releaseBtns.length > 0) {
  releaseBtns.forEach(Btn => {
    Btn.addEventListener("click", async (e) => {
      await deletePokemon(e);
      location.reload();
    })
  })
}
}

// Add eventlistener to evolve pokemon upon click
export const evolvePokemon = () => {
const evolveBtns = document.querySelectorAll(".evolve-btn");
if(evolveBtns.length > 0) {
  evolveBtns.forEach(Btn => {
    Btn.addEventListener("click", async (e) => {
      const docId = e.target.dataset.id;
      const evolvesToName = e.target.dataset.evolves_to_name;
      const evolvedPokemonData = await getPokemonData(evolvesToName);
      const nextEvolvesToName = await getEvolvesToName(evolvedPokemonData.id);
      await updatePokemon(docId, evolvedPokemonData, nextEvolvesToName);
      location.reload();
    })
  })
}
}