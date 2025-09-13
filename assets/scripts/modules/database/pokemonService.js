import { db } from "./dbConfig.js"
import { doc, query, orderBy, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

export const showCapturedData = async () => {
  const querySnapshot = await getDocs(query(collection(db, "captured"), orderBy("captured_at")));

  let htmlData = "";
  querySnapshot.forEach((doc) => {
    htmlData += 
    `<dl>
      <dt><img src="${doc.data().img}" alt=""></dt>
      <dd class="captured-pokemon">${doc.data().name}</dd>
    </dl>
    <button data-id="${doc.id}" class="release-btn">Release</button>
    `;
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
        img: formData.get("img"),
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

