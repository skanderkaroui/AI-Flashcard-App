import { collection, addDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { doc, updateDoc, getDoc } from "firebase/firestore";
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
      title: subCollectionName,
    });

    console.log("flashcard added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding flashcard: ", e);
  }
};

export const getSubCollectionData = async (db, userId) => {
  try {
    // Create a reference to the user's document
    const userDocRef = doc(db, "flashcard", userId);

    // Fetch all collections under the user's document
    const collectionsSnapshot = await getCollections(userDocRef);

    const allData = {};

    // Iterate through each collection and fetch its documents
    for (const subCollection of collectionsSnapshot) {
      const subCollectionRef = collection(userDocRef, subCollection.id);
      const snapshot = await getDocs(subCollectionRef);

      // Extract the data from the snapshot
      const subCollectionData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Store the data in an object, using the collection name as the key
      allData[subCollection.id] = subCollectionData;
    }

    console.log("All collections data:", allData);
    return allData;
  } catch (e) {
    console.error("Error fetching collections data:", e);
    throw e;
  }
};
