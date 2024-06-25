import { collection, addDoc } from "firebase/firestore";
import { db } from "utils/firebase";
import { Place } from "../domain";

export const createPlace = async (place: Place) => {
  try {
    const docRef = await addDoc(collection(db, "place"), place);
    return { id: docRef.id, ...place };
  } catch (e) {
    throw new Error("Error adding document: " + e);
  }
};
