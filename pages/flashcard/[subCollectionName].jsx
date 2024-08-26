import { useEffect, useState } from "react";
import { getSubCollectionData } from "@/app/crud";
// import {getSubCollectionData} from "../../lib/firestore"
import { useRouter } from "next/router";

const SubCollectionPage = () => {
  const router = useRouter();
  const { subCollectionName } = router.query; // Get the dynamic subCollectionName from the route
  const [flashcards, setFlashcards] = useState([]);
  const userId = "yourUserId"; // Replace with actual userId

  useEffect(() => {
    const fetchFlashcards = async () => {
      const db = yourFirebaseDbInstance; // Replace with actual Firestore instance
      if (subCollectionName) {
        const data = await getSubCollectionData(db, userId, subCollectionName);
        setFlashcards(data);
      }
    };
    fetchFlashcards();
  }, [subCollectionName]);

  if (!subCollectionName) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Flashcards in {subCollectionName}</h1>
      {flashcards.length === 0 ? (
        <p>No flashcards found in this subcollection.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {flashcards.map((flashcard) => (
            <div key={flashcard.id} className="card">
              <h2>{flashcard.front}</h2>
              <p>{flashcard.back}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCollectionPage;
