"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { POST } from "../api/generate/route";
import { addFlashCard } from "../crud";
import { db } from "@/firebase";

export default function Flashcard() {
  const [data, setData] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const handleGenerate = async () => {
    const response = await POST(data);
    setFlashcards([response]); // Assume the response is an array of flashcards
  };

  const handleAdd = (front, back) => {
    addFlashCard(db, "flashcard", { front, back });
  };

  return (
    <div>
      <TextField
        onChange={(e) => setData(e.target.value)}
        id="outlined"
        label="Enter Detail"
        variant="outlined"
      />
      <Button
        onClick={handleGenerate}
        variant="contained"
        sx={{ bgcolor: "black" }}
      >
        Generate
      </Button>
      <div className="flashcard-container">
        {flashcards.map((card, index) => (
          <div key={index} className="flashcard">
            <div className="flashcard-inner">
              <div className="flashcard-front">{card.front}</div>
              <div className="flashcard-back">{card.back}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
