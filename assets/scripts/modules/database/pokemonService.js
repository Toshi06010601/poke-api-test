import { db } from "./dbConfig.js"
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const displayCapturedData = async () => {
  const querySnapshot = await getDocs(collection(db, "captured"));

  let htmlData = "";
  querySnapshot.forEach((doc) => {
    htmlData += 
    `<dl>
      <dt><img src="${doc.data().img}" alt=""></dt>
      <dd>${doc.data().name}</dd>
    </dl>`;
  });

  document.querySelector("#js-captured").innerHTML = htmlData;
};


export const capturePokemon = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const docRef = await addDoc(collection(db, "captured"), {
      name: formData.get("name"),
      img: formData.get("img")
    });
    console.log("Added pokemon: ", formData.get("name"));
    location.reload();
  } catch (e) {
    console.error("Error adding pokemon:", e);
  }

}

