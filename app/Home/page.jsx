"use client";

import { UserButton, useUser } from "@clerk/nextjs"; // Import Clerk-related modules
import { auth } from "@/firebase"; // Import Firebase auth
import { signInWithCustomToken } from "firebase/auth"; // Import Firebase auth
import { getDoc, doc, collection, addDoc } from "firebase/firestore";
import { useAuth } from "@clerk/nextjs";
import { db } from "@/firebase";
import { getSubCollectionData } from "../crud";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  //   const { isSignedIn, user } = useUser();
  const { getToken, userId } = useAuth();
  const [flashcardsData, setFlashcardsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const token = await getToken({ template: "integration_firebase" });

    const userCredentials = await signInWithCustomToken(auth, token || "");
    // The userCredentials.user object can call the methods of
    // the Firebase platform as an authenticated user.
    console.log("User:", userCredentials.user);
  };

  const [subcollections, setSubcollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = "yourUserId"; // Replace with the user's ID or fetch it dynamically
        const data = await getSubCollectionData(db, userId); // Fetch all collections' data
        setFlashcardsData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array to ensure it runs once after component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="">
        <UserButton />
        <button onClick={handleSubmit}>Sign In with Firebase</button>
      </div>
      <Link href="/flashcard">
        <button className="h-24 w-28 border border-black">Add FlashCard</button>
      </Link>
      <h1>Flashcard Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {flashcardsData &&
          flashcardsData.map((flashcard) => (
            <div key={flashcard.id} className="card">
              <h2>{flashcard.title}</h2> {/* Example field from flashcard */}
            </div>
          ))}
      </div>
    </>
  );
}
