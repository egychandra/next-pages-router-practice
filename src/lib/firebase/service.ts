import { getFirestore, getDocs, collection } from "firebase/firestore";
import app from "./init";

const db = getFirestore(app);

export const getProducts = async () => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);
  const products = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
};