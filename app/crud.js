import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { query, where, getDocs } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

export const addFlashCard = async (db, userId, subCollectionName, itemData) => {
  try {
    // Create a reference to the user's document in the flashcard collection
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

export const getSubCollectionNames = async (db, userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const userDocRef = doc(db, "flashcard", userId);

    // Get all documents in the user's flashcard collection
    const snapshot = await getDocs(collection(userDocRef, 'subcollections'));

    // Extract and return the names of the subcollections
    const subcollectionNames = snapshot.docs.map((doc) => doc.id);
    console.log("Subcollection names:", subcollectionNames);
    return subcollectionNames;
  } catch (e) {
    console.error("Error fetching subcollection names:", e.message, e.code);
    throw e;
  }
};

export const getSubCollectionData = async (db, userId, subCollectionName) => {
  try {
    // Create a reference to the user's document in the flashcard collection
    const userDocRef = doc(db, "flashcard", userId);

    // Create a reference to the specific sub-collection
    const subCollectionRef = collection(userDocRef, subCollectionName);

    // Fetch all the documents in the subcollection
    const snapshot = await getDocs(subCollectionRef);

    // Extract the data from the snapshot
    const flashcards = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Flashcards data:", flashcards);
    return flashcards;
  } catch (e) {
    console.error("Error fetching flashcards data:", e);
    throw e;
  }
};