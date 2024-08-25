import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { query, where, getDocs } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

export const addFlashCard = async (db, userId, subCollectionName, itemData) => {
  try {
    // Create a reference to the user's document in the pantry collection
    const userDocRef = doc(db, "flashcard", userId);

    // Create a reference to the dynamic sub-collection inside the user's document
    const dynamicCollectionRef = collection(userDocRef, subCollectionName);

    // Add a new document to the dynamic sub-collection with the provided item data
    const docRef = await addDoc(dynamicCollectionRef, {
      front: itemData.front,
      back: itemData.back,
    });

    console.log("flashcard added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding flashcard: ", e);
  }
};
