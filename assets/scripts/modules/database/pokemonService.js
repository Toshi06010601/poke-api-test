import { db } from "./dbConfig.js"
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const showCapturedData = async () => {
  const querySnapshot = await getDocs(collection(db, "captured"));

  let htmlData = "";
  querySnapshot.forEach((doc) => {
    htmlData += 
    `<dl>
      <dt><img src="${doc.data().img}" alt=""></dt>
      <dd class="captured-pokemon">${doc.data().name}</dd>
    </dl>`;
  });

  document.querySelector("#js-captured").innerHTML = htmlData;
};


export const captureNewPokemon = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const targetPokemonName = formData.get("name");

  // Add the selected pokemon to the captured database if it hasn't been captured before
  const capturedPokemons = document.querySelectorAll(".captured-pokemon");
  const samePokemon = [...capturedPokemons].filter(pokemon => targetPokemonName === pokemon.textContent);
  if(samePokemon.length === 0) {
      try {
      const docRef = await addDoc(collection(db, "captured"), {
        name: targetPokemonName,
        img: formData.get("img")
      });
      location.reload();
      } catch (e) {
      console.error("Error adding pokemon:", e);
      }
  } else {
    alert(`${targetPokemonName} was already captured in the past`);
  }

}

export const releasePokemon = async (e) => {
  
}

