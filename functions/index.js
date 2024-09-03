const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.listSubCollections = functions.https.onCall(async (data, context) => {
  const {collectionName, documentId} = data;

  if (!collectionName || !documentId) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Collection name and document ID are required.",
    );
  }

  try {
    const docRef = admin.firestore().collection(collectionName).doc(documentId);
    const subCollections = await docRef.listCollections();
    const subCollectionNames = subCollections.map((col) => col.id);

    const allData = {};
    for (const subCollectionName of subCollectionNames) {
      const snapshot = await docRef.collection(subCollectionName).get();
      allData[subCollectionName] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

    return {subCollectionNames, allData};
  } catch (error) {
    console.error("Error listing sub-collections:", error);
    throw new functions.https.HttpsError(
        "internal",
        "Failed to list sub-collections.",
    );
  }
});
