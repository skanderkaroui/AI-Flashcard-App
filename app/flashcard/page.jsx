"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { POST } from "../api/generate/route";
import { db } from "@/firebase";
import { auth } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
import Header from "@/components/Header";

export default function Flashcard() {
  const [data, setData] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const userId = auth.currentUser?.uid;
  const router = useRouter()

  const handleGenerate = async () => {
    const response = await POST(data);
    setFlashcards([response]);
  };

  const handleAdd = async () => {
    console.log(flashcards);

    try {
      const userId = localStorage.getItem('userID');
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      if (!flashcards.length) {
        console.error("No flashcards generated");
        return;
      }

      const userDocRef = doc(db, "flashcard", userId);
      const docSnap = await getDoc(userDocRef);

      const uniqueId = uuidv4();
      const newFlashcard = {
        front: flashcards[0].front,
        back: flashcards[0].back
      };

      if (docSnap.exists()) {
        await setDoc(userDocRef, {
          [`flashCard${uniqueId}`]: newFlashcard
        }, { merge: true });
      } else {
        await setDoc(userDocRef, {
          [`flashCard${uniqueId}`]: newFlashcard
        });
      }
      router.push('/Home')
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  };

  return (
    <div>
      <Header/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <TextField
          onChange={(e) => setData(e.target.value)}
          id="outlined"
          label="Enter Detail"
          variant="outlined"
          sx={{ width: "2/4" }}
        />
        <Button
          onClick={handleGenerate}
          variant="contained"
          sx={{ bgcolor: "#2563EB", marginLeft: "20px" }}
        >
          Generate
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "true" }} className="flashcard-container">
        {flashcards.map((card, index) => (
          <div style={{margin: "20px 20px", padding: "10px", width: "300px"}} key={index} className="flashcard">
            <div className="flashcard-inner">
              <div style={{padding: "0 20px"}} className="flashcard-front">{card.front}</div>
              <div style={{padding: "0 20px"}} className="flashcard-back">{card.back}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {
          flashcards.length &&
          <Button onClick={handleAdd} sx={{ bgcolor: "#2563EB", color: "#fff", width: "100px" }}>
            Save
          </Button>
        }
      </div>
    </div>
  );
}
