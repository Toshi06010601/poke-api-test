import { db } from "./dbConfig.js"
import { doc, query, orderBy, collection, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

export const fetchCapturedPokemons = async () => {
  return await getDocs(query(collection(db, "captured"), orderBy("captured_at")));
};


export const addNewPokemon = async (name, img, cry, evolvesTo) => {
  try {
  const docRef = await addDoc(collection(db, "captured"), {
    name: name,
    img: img,
    cry: cry,
    evolvesTo: evolvesTo,
    captured_at: new Date(),
  });
  } catch (e) {
  console.error("Error adding pokemon:", e);
  }
}

export const updatePokemon = async (docId, evolvedPokemon, nextEvolvesToName) => {
  try {
    await updateDoc(doc(db, "captured", docId), {
      name: evolvedPokemon.name,
      img: evolvedPokemon.sprites.front_default,
      cry: evolvedPokemon.cries.latest,
      evolvesTo: nextEvolvesToName,
    });
  }
  catch (e) {
    console.error("Failed to release the pokemon:", e)
  }
}

export const deletePokemon = async (e) => {
  const docId = e.target.dataset.id;
  try {
    await deleteDoc(doc(db, "captured", docId));
  }
  catch (e) {
    console.error("Failed to release the pokemon:", e)
  }
}

