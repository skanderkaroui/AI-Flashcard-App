import { db } from "@/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// Function to get the names of sub-collections (assuming you store them somewhere)
// Example implementation assuming you store sub-collection names in a document
export const getSubCollectionNames = async (db, collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const subCollectionsDocRef = doc(db, collectionName, documentId, "subCollections", "info");
    const docSnap = await getDoc(subCollectionsDocRef);
    if (docSnap.exists()) {
      return docSnap.data().subCollections || []; // Array of sub-collection names
    } else {
      console.error("No sub-collections document found!");
      return [];
    }
  } catch (e) {
    console.error("Error fetching sub-collection names:", e);
    throw e;
  }
};

// Function to get all documents from all sub-collections
export const getAllSubCollectionData = async (documentId) => {
  try {
    const subCollectionNames = await getSubCollectionNames(db, "flashcard", documentId);
    const allData = {};


    for (const subCollectionName of subCollectionNames) {
      const subCollectionRef = collection(db, "flashcard", documentId, subCollectionName);
      const snapshot = await getDocs(subCollectionRef);

      const subCollectionData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      allData[subCollectionName] = subCollectionData;
    }

    console.log("All sub-collections data:", allData);
    return allData;
  } catch (e) {
    console.error("Error fetching all sub-collections data:", e);
    throw e;
  }
};

export const getAllData = async (userId) => {
  try{
    const userDocRef = doc(db, "flashcard", userId);
    const docSnap = await getDoc(userDocRef);
    let data = {}

    if (docSnap.exists()) {
      data = docSnap.data();
    } else {
      console.log("No such document!");
    }
    return data;
  }catch(err){
    console.error(err)
  }
};
