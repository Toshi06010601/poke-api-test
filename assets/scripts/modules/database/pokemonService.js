import { db } from "./dbConfig.js"
import { doc, query, orderBy, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

export const fetchCapturedPokemons = async () => {
  return await getDocs(query(collection(db, "captured"), orderBy("captured_at")));
};


export const addNewPokemon = async (name, img, cry) => {
  try {
  const docRef = await addDoc(collection(db, "captured"), {
    name: name,
    img: img,
    cry: cry,
    captured_at: new Date(),
  });
  } catch (e) {
  console.error("Error adding pokemon:", e);
  }
}

export const deletePokemon = async (e) => {
  const docId = e.target.dataset.id;
  try {
    await deleteDoc(doc(db, "captured", docId));
    location.reload();
  }
  catch (e) {
    console.error("Failed to release the pokemon:", e)
  }
}

