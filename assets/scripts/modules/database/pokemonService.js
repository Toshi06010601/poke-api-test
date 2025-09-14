import { db } from "./dbConfig.js"
import { doc, query, orderBy, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

export const showCapturedData = async () => {
  const querySnapshot = await getDocs(query(collection(db, "captured"), orderBy("captured_at")));

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

  // Add eventlistener to play cry when the image gets clicked
  document.querySelectorAll(".captured-item img").forEach((img)=> {
    img.addEventListener("click", (e) => {
      const crySound = new Audio(e.target.dataset.cry);
      crySound.play();
    })
  })
};


export const captureNewPokemon = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const targetPokemonName = formData.get("name");

  // Add the selected pokemon if it hasn't been captured before
  const capturedPokemons = document.querySelectorAll(".captured-pokemon");
  const samePokemon = [...capturedPokemons].filter(pokemon => targetPokemonName === pokemon.textContent);
  if(samePokemon.length === 0) {
      try {
      const docRef = await addDoc(collection(db, "captured"), {
        name: targetPokemonName,
        img: formData.get("img"),
        cry: formData.get("cry"),
        captured_at: new Date(),
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
  const docId = e.target.dataset.id;
  try {
    await deleteDoc(doc(db, "captured", docId));
    location.reload();
  }
  catch (e) {
    console.error("Failed to release the pokemon:", e)
  }
}

