import { deletePokemon } from "./database/pokemonService";

export const showCapturedPokemons = (querySnapshot) => {
  let htmlData = '';
  querySnapshot.forEach((doc) => {
    htmlData += 
    `<div class="captured-item"><dl>
      <dt><img src="${doc.data().img}" alt="" data-cry="${doc.data().cry}"></dt>
      <dd class="captured-pokemon">${doc.data().name}</dd>
    </dl>
    <button data-id="${doc.id}" class="release-btn"></button>
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
    })
  })
}
}