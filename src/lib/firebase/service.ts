import { getFirestore, getDocs, collection, getDoc, doc, query, where, addDoc } from "firebase/firestore";
import app from "./init";
import bcrypt from 'bcryptjs';

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

export async function signUp(
  userData: { email: string; fullname: string; password: string; role?: string },
  callback: (result: { status: boolean; message: string }) => void
) {
  const q = query(collection(db, "users"), where("email", "==", userData.email));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback({ status: false, message: "Email already registered" });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(db, "users"), userData)
    .then(() => {
      callback({ status: true, message: "Register success" });
    })
    .catch((error) => {
      callback({ status: false, message: error });
    })
  }
}