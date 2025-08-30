import { getFirestore, getDocs, collection, getDoc, doc } from "firebase/firestore";
import app from "./init";

const db = getFirestore(app);

export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

export const getProductById = async (id: string) => {
  const snapshot = await getDoc(doc(db, "products", id));
  const data = snapshot.data();
  return data;
}