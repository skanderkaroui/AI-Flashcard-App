"use client";

import { UserButton, useUser } from "@clerk/nextjs"; // Import Clerk-related modules
import { auth } from "@/firebase"; // Import Firebase auth
import { signInWithCustomToken } from "firebase/auth"; // Import Firebase auth
import { useAuth } from "@clerk/nextjs";
import { db } from "@/firebase";
import { getAllData, getAllSubCollectionData } from "../crud";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  //   const { isSignedIn, user } = useUser();
  const { getToken, userId } = useAuth();
  const [flashcardsData, setFlashcardsData] = useState([]);
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
        const collectionId = localStorage.getItem('userID');
        const data = await getAllData(collectionId);
        setFlashcardsData(data)
        console.log(data)
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
    <div style={{ width: "100%" }}>
      <Header />
      <Link style={{ display: "flex", justifyContent: "center", margin: '20px 0' }} href="/flashcard">
        <button

          className="bg-primary text-primary-foreground font-bold py-3 px-16 rounded-lg hover:bg-primary/90 transition duration-300"
        >
          Add FlashCard
        </button>

      </Link>
      <h1 style={{textAlign: "center", marginTop: "30px", fontSize: "19px", font: "bold"}}>Flashcard Data</h1>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "true" }} className="flashcard-container">
        {flashcardsData && Object.keys(flashcardsData).length && Object.keys(flashcardsData)?.map((card, index) => (
          <div style={{ margin: "20px 20px",  minWidth: "300px" }} key={index} className="flashcard">
            <div className="flashcard-inner">
              <div style={{ padding: "0 20px" }} className="flashcard-front">{flashcardsData[card].front}</div>
              <div style={{ padding: "0 20px" }} className="flashcard-back">{flashcardsData[card].back}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
