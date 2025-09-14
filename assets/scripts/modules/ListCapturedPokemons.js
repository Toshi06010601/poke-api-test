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

export const playCryOnClick = () => {
    // Add eventlistener to play cry when the image gets clicked
  document.querySelectorAll(".captured-item img").forEach((img)=> {
    img.addEventListener("click", (e) => {
      const crySound = new Audio(e.target.dataset.cry);
      crySound.play();
    })
  })
}

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