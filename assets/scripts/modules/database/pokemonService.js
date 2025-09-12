import { db } from "./dbConfig.js"
import { collection, getDocs } from 'firebase/firestore';

export const fetchCapturedData = async () => {
  const querySnapshot = await getDocs(collection(db, "captured"));

  let htmlData = "";
  querySnapshot.forEach((doc) => {
    htmlData += 
    `<dl>
      <dt>Name: ${doc.data().name}</dt>
      <dd><img src="${doc.data().img}" alt=""></dd>
    </dl>`;
  });

  document.querySelector("#js-captured").innerHTML = htmlData;
}